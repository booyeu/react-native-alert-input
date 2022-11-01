import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Animated,
  Dimensions,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  masker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
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

const PickerActionSheet = props => {
  const {
    show = false,
    title = '',
    onCancel,
    onSubmit,
    cancelText = 'cancel',
    submitText = 'submit',
    cancelStyle,
    submitStyle,
    btnsStyle,
    style,
    inputStyle,
    placeholder = '',
    colors,
    num = 1,
    content = [],
  } = props;

  const keyboardHeight = useRef(new Animated.Value(windowHeight));
  const [inputValue, setInputValue] = useState([]);

  const InputContent = useMemo(() => {
    const myContent = [];
    if (!content || content.length !== num) {
      for (let i = 0; i < num; i++) {
        myContent.push(
            <TextInput
                key={'input_' + i}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                  inputStyle,
                ]}
                placeholderTextColor={colors.placeholder}
                autoFocus={i === 0}
                onChangeText={text => {
                  setInputValue(prev => {
                    prev[i] = text;
                    return prev;
                  });
                }}
                placeholder={placeholder}
            />,
        );
      }
    } else {
      for (let i = 0; i < num; i++) {
        myContent.push(content[i]);
      }
    }
    return myContent;
  }, [colors, content, inputStyle, num, placeholder]);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', e => {
      Animated.timing(keyboardHeight.current, {
        toValue: windowHeight - e.endCoordinates.height,
        duration: 150,
        useNativeDriver: false,
      }).start();
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(keyboardHeight.current, {
        toValue: windowHeight,
        duration: 150,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  return show ? (
      <Animated.View
          style={[styles.animated_container, {height: keyboardHeight}]}>
        <TouchableOpacity
            activeOpacity={1}
            style={styles.masker}
            onPress={onCancel}
        />
        <View style={[styles.container, {backgroundColor: colors.card}, style]}>
          {title ? (
              typeof title === 'string' ? (
                  <Text style={styles.title}>{title}</Text>
              ) : (
                  title
              )
          ) : null}
          {InputContent}
          <View
              style={[
                styles.btn_container,
                {borderColor: colors.border},
                btnsStyle,
              ]}>
            <Text
                style={[styles.btn, {color: colors.text}, cancelStyle]}
                onPress={onCancel}>
              {cancelText}
            </Text>
            <Text
                style={[styles.btn, {color: colors.text}, submitStyle]}
                onPress={() => {
                  setInputValue([]);
                  onSubmit?.(num === 1 ? inputValue[0] : inputValue);
                }}>
              {submitText}
            </Text>
          </View>
        </View>
      </Animated.View>
  ) : null;
};

export default memo(PickerActionSheet);
