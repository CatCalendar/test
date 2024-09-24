import '../styles/global.scss';
import Navbar from '../components/Navbar';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <div className="wrap">
        <div className="is_nav">{children}</div>
        <Navbar />
      </div>
    </Provider>
  );
}
