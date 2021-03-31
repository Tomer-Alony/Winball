import { createMuiTheme } from '@material-ui/core/styles';
import Assistant from './fonts/Anton-Regular.ttf';
import LuckiestGuyRegular from './fonts/LuckiestGuy-Regular.ttf';

const assistant = {
  fontFamily: 'Assistant',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Assistant'),
    local('Anton-Regular'),
    url(${Assistant}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const luckiestGuy = {
    fontFamily: 'LuckiestGuy',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('LuckiestGuy'),
      local('LuckiestGuy-Regular'),
      url(${LuckiestGuyRegular}) format('truetype')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export default createMuiTheme({
    typography: {
        fontFamily: 'Assistant',
        h4: {
            fontFamily: 'fantasy'
        }
    },
    overrides: {
        MuiCssBaseline: {
          '@global': {
            '@font-face': [luckiestGuy, assistant],
          },
        },
      },
    palette: {
        primary: { 
          main: '#000066',
          contrastText: '#fff',
        },
        secondary: { 
          main: '#008891',
          light: '#008891',
          contrastText: '#fff',
        },
        backgroundColor: {
          main: '#403f3f'
        }
    },
});