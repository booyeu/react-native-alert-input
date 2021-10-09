import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Keyboard,
  Animated,
  TouchableOpacity,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;


export default class extends React.Component {
  static defaultProps = {
    show: false,
    title: '',
    onCancel: () => {},
    onSubmit: text => {},
    cancelText: 'cancel',
    submitText: 'submit',
    cancelStyle: {},
    submitStyle: {},
    style: {},
    inputStyle: {},
    placeholder: '',
    colors: {},
    num: 1,
    content: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      keyboardHeight: new Animated.Value(windowHeight),
    };
    this.cancelF = () => this.props.onCancel();
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        Animated.timing(this.state.keyboardHeight, {
          toValue: windowHeight - e.endCoordinates.height,
          duration: 150,
          useNativeDriver: false,
        }).start();
      },
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(this.state.keyboardHeight, {
          toValue: windowHeight,
          duration: 150,
          useNativeDriver: false,
        }).start();
      },
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  render() {
    const content = this.state.content;
    const myContent = [];
    const num = this.props.num;
    if (!this.props.content || this.props.content.length !== num) {
      for (let i = 0; i < num; i++) {
        myContent.push(
          <TextInput
            key={'input_' + i}
            style={[
              styles.input,
              {
                backgroundColor: this.props.colors.background,
                color: this.props.colors.text,
                borderColor: this.props.colors.border,
              },
              this.props.inputStyle,
            ]}
            defaultValue={content[i] || ''}
            placeholderTextColor={this.props.colors.placeholder}
            autoFocus={i === 0}
            onChangeText={text => {
              content[i] = text;
              this.setState({content: content});
            }}
            placeholder={this.props.placeholder}
            underlineColorAndroid={'transparent'}
          />,
        );
      }
    } else {
      for (let i = 0; i < num; i++) {
        myContent.push(this.props.content[i]);
      }
    }
    return this.props.show ? (
      <Animated.View
        style={[
          styles.animated_container,
          {height: this.state.keyboardHeight},
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.masker}
          onPress={this.cancelF}
        />
        <View
          style={[
            styles.container,
            {backgroundColor: this.props.colors.card},
            this.props.style,
          ]}>
          {this.props.title ? (
            typeof this.props.title === 'string' ? (
              <Text style={styles.title}>{this.props.title}</Text>
            ) : (
              this.props.title
            )
          ) : null}
          {myContent}
          <View
            style={[
              styles.btn_container,
              {borderColor: this.props.colors.border},
              this.props.btnsStyle,
            ]}>
            <Text
              style={[
                styles.btn,
                {color: this.props.colors.text},
                this.props.cancelStyle,
              ]}
              onPress={this.cancelF}>
              {this.props.cancelText}
            </Text>
            <Text
              style={[
                styles.btn,
                {color: this.props.colors.text},
                this.props.submitStyle,
              ]}
              onPress={() => {
                this.setState({content: []});
                this.props.onSubmit(
                  num === 1 ? this.state.content[0] : this.state.content,
                );
              }}>
              {this.props.submitText}
            </Text>
          </View>
        </View>
      </Animated.View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  masker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  animated_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '75%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    paddingTop: 13,
    paddingHorizontal: 6,
    fontSize: 15,
    color: '#888',
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 10,
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#eee',
    marginVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    fontSize: 15,
  },
  btn_container: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    marginTop: 10,
  },
  btn: {
    width: '50%',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
