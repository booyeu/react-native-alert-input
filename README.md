# react-native-alert-input [![Monthly download](https://img.shields.io/npm/dm/react-native-alert-input.svg)](https://img.shields.io/npm/dm/react-native-alert-input.svg) [![Total downloads](https://img.shields.io/npm/dt/react-native-alert-input.svg)](https://img.shields.io/npm/dt/react-native-alert-input.svg)

## Install

```bash
npm install react-native-alert-input --save
```

## Usage

```javascript
import AlertInput from 'react-native-alert-input';

<AlertInput />
```

## Example

![ios](https://raw.githubusercontent.com/BooYeu/react-native-alert-input/master/images/ios.jpg)
![android](https://raw.githubusercontent.com/BooYeu/react-native-alert-input/master/images/android.jpg)

## Properties

| Prop  | Default  | Required | Description |
| :------------ |:---------------:| :---------------:| :-----|
| show | false | yes | Controller whether or not show it |
| style | - | no | The style of the container |
| title | '' | no | The title text of the container |
| titleStyle | - | no | The style of the title |
| onCancel | ()=>{} | no | Function that is called when user cancels it |
| onSubmit | (text)=>{} | no | Function that is called when user submits it |
| cancelText | 'cancel' | no | The string that is displayed on the cancel button |
| submitText | 'submit' | no | The string that is displayed on the submit button |
| cancelStyle | - | no | The style of the cancel button( <Text> ) |
| submitStyle | - | no | The style of the submit button( <Text> ) |
| style | - | no | The style of the container |
| placeholder | '' | no | The placeholder text of the input |
| inputStyle | - | no | The style of the input |
