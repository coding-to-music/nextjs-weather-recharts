import clsx from 'clsx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import useStyles from './useStyles'
import { getWeather } from '../../../store/weather/action'

function MyAppBar(props) {
  const classes = useStyles()

  // Passed down from parent
  const {
    openDrawer,
    setOpenDrawer,
    place,
    setPlace,
    appBarTitle,
  } = props

  // From mapStateToProps
  const {
    weather,
    geolocation,
  } = props

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const submitHandler = async e => {
    e.preventDefault()
    await props.getWeather(place)
    setPlace('')
  }

  return (
    <AppBar
      position='absolute'
      className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          className={clsx(
            classes.menuButton,
            openDrawer && classes.menuButtonHidden
          )}>
          <MenuIcon />
        </IconButton>
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          className={classes.title}>
          {appBarTitle}
        </Typography>

        {/* Search will appear in Welcome page if geolocation position is initially denied. */}
        {weather.noWeatherData && geolocation.deniedGeolocation ? null : (
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={submitHandler}>
              <InputBase
                placeholder='Search..'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={place}
                onChange={e => setPlace(e.target.value)}
              />
            </form>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

function mapStateToProps({ weather, geolocation }) {
  return { weather, geolocation }
}

const mapDispatchToProps = dispatch => {
  return {
    getWeather: bindActionCreators(getWeather, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAppBar)
