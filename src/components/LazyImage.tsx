import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Skeleton } from '@mui/material';
import { ImageProps } from 'next/image';
import IcedAmericano from "@/app/assets/icons/LogoFinal.png";


interface LazyImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
}

const LazyImage = ({ src, alt, width, height, ...props }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {!loaded && (
        <Skeleton 
          variant="rectangular" 
          width={width} 
          height={height}
          sx={{ borderRadius: '50px' }}
        />
      )}
      <Image
        src={error ? IcedAmericano : src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        style={{ 
          display: loaded ? 'block' : 'none',
          width: '100%',
          height: '100%',
          objectFit: 'none'
        }}
        {...props}
      />
    </>
  );
};

export default LazyImage;