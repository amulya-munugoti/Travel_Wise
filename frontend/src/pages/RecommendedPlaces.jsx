import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, MapPin, RotateCcw, Search, X } from 'lucide-react';
import { placesApi } from '../services/api';
import PlaceCard from '../components/trip/PlaceCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SELECTION_KEY = 'travelwise_selected_places';

function getSavedSelection() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(SELECTION_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.warn('Could not restore selected places:', error);
    return [];
  }
}

export default function RecommendedPlaces() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selected, setSelected] = useState(getSavedSelection);
  const [selectionMessage, setSelectionMessage] = useState('');

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const [placesResponse, citiesResponse, categoriesResponse] = await Promise.all([
          placesApi.getPlaces(),
          placesApi.getCities(),
          placesApi.getCategories(),
        ]);
        setPlaces(placesResponse.data || []);
        setCities(citiesResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        console.error('Failed to load places:', error);
        setLoadError(error.response?.data?.detail || 'Places could not be loaded. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadPlaces();
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(SELECTION_KEY, JSON.stringify(selected));
    } catch (error) {
      console.warn('Could not save selected places for this session:', error);
    }
  }, [selected]);

  const filteredPlaces = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return places.filter((place) => (
      (!query || [place.name, place.description, place.city].some((value) => value?.toLowerCase().includes(query)))
      && (!selectedCity || place.city === selectedCity)
      && (!selectedCategory || place.category === selectedCategory)
    ));
  }, [places, searchQuery, selectedCity, selectedCategory]);

  const changeCity = (city) => {
    setSelectedCity(city);
    setSelectionMessage('');
    if (selected.length && selected.some((place) => place.city !== city) && city) {
      setSelected([]);
      setSelectionMessage('Your place selection was cleared because it belongs to a different destination.');
    }
  };

  const toggleSelected = (place) => {
    const placeId = `curated:${place.id}`;
    const alreadySelected = selected.some((item) => item.place_id === placeId);
    if (!alreadySelected && selected.length && selected[0].city !== place.city) {
      setSelectionMessage(`Choose places in ${selected[0].city}, or clear your selection to plan a trip to ${place.city}.`);
      return;
    }
    setSelectionMessage('');
    setSelected((current) => (
      alreadySelected
        ? current.filter((item) => item.place_id !== placeId)
        : [...current, { ...place, place_id: placeId }]
    ));
  };

  const clearSelection = () => {
    setSelected([]);
    setSelectionMessage('');
  };

  const continueToPlanner = () => {
    const city = selected[0]?.city || selectedCity;
    const placeIds = selected
      .filter((place) => place.place_id.startsWith('curated:'))
      .map((place) => place.place_id.replace('curated:', ''));
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (placeIds.length) params.set('selected', placeIds.join(','));
    navigate(`/create-trip${params.size ? `?${params.toString()}` : ''}`);
  };

  if (loading) return <LoadingSpinner text="Finding places to explore..." />;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-700">
              <Compass className="h-4 w-4" /> Destination guide
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Find places for your next trip</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Browse the curated catalogue by city or interest. Pick the places you want to include, then shape the rest of your trip.
            </p>
          </div>
          <button
            type="button"
            onClick={continueToPlanner}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
          >
            {selected.length ? `Plan with ${selected.length} selected` : 'Start a trip'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </header>

        {selected.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-900">
              <MapPin className="h-4 w-4" />
              {selected.length} {selected.length === 1 ? 'place' : 'places'} selected for {selected[0].city}
            </p>
            <button type="button" onClick={clearSelection} className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950">
              <X className="h-4 w-4" /> Clear selection
            </button>
          </div>
        )}

        {selectionMessage && (
          <p role="status" className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {selectionMessage}
          </p>
        )}

        <section aria-label="Filter places" className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(16rem,1fr)_minmax(12rem,0.7fr)_minmax(12rem,0.7fr)_auto]">
          <label className="relative block">
            <span className="sr-only">Search places</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search places or cities"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            />
          </label>
          <label>
            <span className="sr-only">Filter by city</span>
            <select value={selectedCity} onChange={(event) => changeCity(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-emerald-600">
              <option value="">All destinations</option>
              {cities.map((city) => <option key={city} value={city}>{city}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by interest</span>
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-emerald-600">
              <option value="">All interests</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); changeCity(''); setSelectedCategory(''); }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </section>

        {loadError ? (
          <div role="alert" className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-800">
            <p className="font-semibold">{loadError}</p>
            <Link to="/create-trip" className="mt-3 inline-flex items-center gap-1 font-bold text-rose-900">
              Continue to trip planner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : filteredPlaces.length ? (
          <>
            <p className="mt-7 text-sm text-slate-500">{filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'} to explore</p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPlaces.map((place) => {
                const isSelected = selected.some((item) => item.place_id === `curated:${place.id}`);
                return (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    onSelect={toggleSelected}
                    isSelected={isSelected}
                    showSelectBtn
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Search className="mx-auto h-8 w-8 text-slate-400" />
            <h2 className="mt-3 text-lg font-bold text-slate-900">No places match those filters</h2>
            <p className="mt-1 text-sm text-slate-600">Try another search or reset the filters to see all destinations.</p>
            <button type="button" onClick={() => { setSearchQuery(''); changeCity(''); setSelectedCategory(''); }} className="mt-4 text-sm font-bold text-emerald-700 hover:text-emerald-900">
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
