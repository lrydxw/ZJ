import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import RecyclerView from 'rax-recyclerview';
import Image from 'rax-image';

const { Header, Cell } = RecyclerView;

const imageUrl = 'http://www.freeiconspng.com/uploads/phone-flat-icon-png-30.png';

const styles = {
  container: {
    flex: 1
  },
  view: {
    height: 80,
    borderBottomStyle: 'solid',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 32,
    color: '#666'
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 10
  }
};

class List extends Component {
  getCell(item) {
    return (
      <Cell>
        <View style={styles.view}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </Cell>
    );
  }
  onLoadMore() {
    this.props.onLoadMore && this.props.onLoadMore();
  }
  render() {
    console.log(this.props.dataSource);
    return (
      <RecyclerView
        style={styles.container}
        onEndReached={() => {
          this.onLoadMore()
        }}
      >
        {
          this.props.dataSource.map(item => this.getCell(item))
        }
      </RecyclerView>
    );
  }
}

export default List;
