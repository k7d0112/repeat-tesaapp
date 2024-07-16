import { Link } from 'react-router-dom';

export default function Header (){
    return (
      <header className='p-6 bg-[#333] flex justify-between  items-center'>
        <h1>
          <Link to='/' className='font-sans text-white font-bold'>Blog</Link>
        </h1>
        <Link to='/Contact' className='font-sans text-white font-bold'>お問い合わせ</Link>
      </header>
    );
}