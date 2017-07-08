import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import Slider from 'rax-slider';

import List from './list';

// import styles from './App.css';

const styles = {
  container: {
    flex: 1,
    width: 750,
    display: 'flex',
    position: 'relative'
  },
  slider: {  
    width: '750rem',
    position: 'relative',
    overflow: 'hidden',
    height: '252rem',
    backgroundColor: '#e5e5e5' 
  },
  itemWrap: {
    width: '750rem',  
    height: '252rem'
  },
  image: {
    width: '750rem',
    height: '252rem',
    lineHeihgt: 1,
    float: 'left' 
  },
  button: {
    marginTop: '20rem',
    width: '340rem',
    height: '80rem'
  },
  paginationStyle: {
    position: 'absolute',
    width: '750rem',
    height: '40rem',
    bottom: '20rem',
    left: 0,
    itemColor: 'rgba(255, 255, 255, 0.5)',
    itemSelectedColor: 'rgb(255, 80, 0)',
    itemSize: '8rem'
  },
  text: {
    fontSize: 50
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 0,
      loading: false
    };
  }

  onchange(index) {
    console.log('change', index);
  }

  componentDidMount() {
    console.log('xx');
    this.onLoadMore();
  }

  onLoadMore() {
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true
    });

    setTimeout(() => {
      const list = this.state.list.concat(this.getAppendList(this.state.list.length, 20));
      this.setState({
        list,
        loading: false,
        page: this.state.page + 1
      });
    }, 200);
  }

  getAppendList(len, total) {
    const list = [];
    for (var i = len; i < len + total; i++) {
      list.push({
        text: `我是标题${i}`
      });
    }
    return list;
  }

  render() {
    return (
      <View style={styles.container}>
        <Slider className="slider" width="750rem" height="352rem" style={styles.slider}
          autoPlay={true}
          loop={true}
          showsPagination={true}
          paginationStyle={styles.paginationStyle}
          autoplayTimeout={3000}
          onChange={this.onchange.bind(this)}>
          <View style={styles.itemWrap}>
            <Image style={styles.image} source={{uri: '//img.alicdn.com/tps/TB1m2LyJFXXXXbHXpXXXXXXXXXX-1125-352.jpg_q50.jpg'}} />
          </View>
          <View style={styles.itemWrap}>
            <Image style={styles.image} source={{uri: '//img.alicdn.com/tps/TB1ogUvJFXXXXaAXXXXXXXXXXXX-1125-352.jpg_q50.jpg'}} />
          </View>
          <View style={styles.itemWrap}>
            <Image style={styles.image} source={{uri: '//gw.alicdn.com/tps/i4/TB1pgxYJXXXXXcAXpXXrVZt0FXX-640-200.jpg_q50.jpg'}} />
          </View>
          <View style={styles.itemWrap}>
            <Image style={styles.image} source={{uri: '//gw.alicdn.com/imgextra/i4/3/TB2STElaohnpuFjSZFPXXb_4XXa_!!3-0-yamato.jpg_q50.jpg'}} />
          </View>
        </Slider>

        <List
          dataSource={this.state.list}
          loading={this.state.loading}
          onLoadMore={this.onLoadMore.bind(this)}
        />
      </View>
    );
  }
}

export default App;
