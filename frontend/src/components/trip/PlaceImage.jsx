import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

const PHOTO_SOURCES = {
  Charminar: 'https://commons.wikimedia.org/wiki/File:Charminar-Pride_of_Hyderabad.jpg',
  'Mecca Masjid': 'https://commons.wikimedia.org/wiki/File:Mecca_Masjid_by_Night_View2.JPG',
  'Qutb Shahi Tombs': 'https://commons.wikimedia.org/wiki/File:Tomb_of_Muhammad_Quli_Qutb_Shah.jpg',
  'Baga Beach': 'https://commons.wikimedia.org/wiki/File:BagaBeachPanorana.jpg',
  'Palolem Beach': 'https://commons.wikimedia.org/wiki/File:Palolem_beach,_Goa_-_panoramio.jpg',
  'Hawa Mahal (Palace of Winds)': 'https://commons.wikimedia.org/wiki/File:Hawa_Mahal_front_view.JPG',
  'Jal Mahal Viewpoint': 'https://commons.wikimedia.org/wiki/File:Jal_Mahal_in_Man_Sagar_Lake.jpg',
  'Vidhana Soudha': 'https://commons.wikimedia.org/wiki/File:Vidhana_Soudha_close.jpg',
  'Chowmahalla Palace': 'https://commons.wikimedia.org/wiki/File:Chowmahalla_Palace_Front_View.jpg',
  'Salar Jung Museum': 'https://commons.wikimedia.org/wiki/File:Salar_Jung_Museum.jpg',
  'Mattupetty Dam': 'https://commons.wikimedia.org/wiki/File:Mattupetty_Dam.jpg',
  'Taj Mahal': 'https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India.jpg',
};

/** Never substitute an unrelated stock image for a named place. */
export default function PlaceImage({ src, name, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className={`bg-gradient-to-br from-slate-900 via-brand-900 to-ocean-800 text-white flex flex-col items-center justify-center p-5 text-center ${className}`}><ImageOff className="w-7 h-7 text-brand-300 mb-2" /><span className="text-sm font-bold leading-tight">{name}</span><span className="text-[11px] text-slate-300 mt-1">Photo unavailable</span></div>;
  return (
    <div className="relative w-full h-full">
      <img src={src} alt={name} className={className} onError={() => setFailed(true)} loading="lazy" />
      {PHOTO_SOURCES[name] && (
        <a href={PHOTO_SOURCES[name]} target="_blank" rel="noreferrer" title="View photo source and license details" className="absolute bottom-2 right-2 rounded bg-slate-950/75 px-2 py-1 text-[10px] font-medium text-white underline underline-offset-2">
          Photo source
        </a>
      )}
    </div>
  );
}
