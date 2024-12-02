import { HeaderStyle } from './Header.Style';
import Link from 'next/link';
import Image from 'next/image';
import { arrowLeft } from '@/app/assets/icons';

const Header: React.FC = () => {

  return (
    <HeaderStyle>
    <div className="header">
        <Link href={`/Menu`}>
            <Image src={arrowLeft} width={25} height={25} alt={`arrow-image`} className="arrow-icon" />
        </Link>
    </div>
    </HeaderStyle>
  );
};

export default Header;
