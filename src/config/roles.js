import RewardBurger from '../pages/RewardBurger';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import CustomersData from '../pages/CustomersData';
import Confirm from '../components/Products/Confirm';

const components = {
  home: {
    path: '/home',
    page: RewardBurger,
  },
  login: {
    path: '/login',
    page: Login,
  },
  register: {
    path: '/register',
    page: Register,
  },
  admin: {
    path: '/admin',
    page: CustomersData,
  },
  confirm: {
    path: '/confirm/:id',
    page: Confirm,
  },
};

const roles = {
  GUEST: [components.login, components.register, components.home],
  USER: [components.home, components.confirm],
  ADMIN: [components.home, components.admin],
};

export default roles;
