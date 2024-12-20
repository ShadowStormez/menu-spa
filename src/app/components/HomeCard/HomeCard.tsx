import Image, { StaticImageData } from "next/image";
import { HomeCardStyle } from "./HomeCard.Style";
import Button from '@mui/material/Button';
import { ArrowLeft } from '@/app/assets/icons';

interface CardProps {
  title: string;
  link: string;
  imageSrc: string | StaticImageData; 
  whereTo: string;
}

const HomeCard: React.FC<CardProps> = ({ title, link, imageSrc,whereTo }) => (
  <HomeCardStyle>
    <div className="HomeCard-Container">
      <div className="Image-Container">
        <Image src={imageSrc} width={200} height={200} alt={`${title} image`} />
      </div>
      <div className="HomeCard-Content">
        <h2 className="HomeCard-Title">{title}</h2>
        <Button href={link} className="HomeCard-Link">
        <ArrowLeft width={15} height={15} fill="var(--lightblue-color)"/>
          {whereTo}
        </Button>
      </div>
    </div>
  </HomeCardStyle>
);

export default HomeCard;
