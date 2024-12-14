import { HeaderStyle } from './Header.Style';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from '@/app/assets/icons';

const Header: React.FC = () => {

  return (
    <HeaderStyle>
    <div className="header">
        <Link href={`/Menu`}>
        <ArrowLeft width={15} height={15} fill="#fff"/>
        </Link>
    </div>
    </HeaderStyle>
  );
};

export default Header;
