import './LeseteppichImage.scss';
import Funki1 from '../../assets/funki/Funki_Freude_01.svg';
import { filterIdFromName } from '../../helper-functions/index.ts';
import { useJsonStore } from '../../store/index.ts';


interface LeseteppichImageProps {
  teppichId: string;
  size?: 'preview' | 'big' | 'fullsize';
  id?: string;
  onClick?: () => void;
}

const LeseteppichImage = ({teppichId, size = 'big', id, onClick}: LeseteppichImageProps) => {
  const originalJson = useJsonStore(state => state.originalJson);

  const findTeppich = originalJson?.find((tepp) => tepp.id === Number(teppichId));

  if (!findTeppich) return null;

  return (
    <div id={id}
         className={`leseteppich-image ${size === 'preview' ? 'preview' : ''} ${onClick ? 'onClick' : ''}`}
         onClick={onClick}>
      <div className={`leseteppich-table ${size === 'fullsize' ? 'fullsize' : ''}`}>
        <div className="table-head">
          <img src={Funki1} alt="Funki junior" className="funki"/>
          <div className="heading_container">
            <div className="heading">{filterIdFromName(findTeppich.name, teppichId)}</div>
            <div className="teppich-id">{teppichId}</div>
          </div>
          <div className="chars">{findTeppich.chars.join(' ')}</div>
        </div>
        {findTeppich.strings.map((row, index) => (
          <div key={index}
               className="table-row">
            {row.map((string, indx) => <div key={`${indx}_${string}`} className="table-cell">{string}</div>)}
          </div>
        ))}
      </div>

    </div>
  );
};

export default LeseteppichImage;
