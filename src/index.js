import React from 'react';
import {StyleSheet,View,Text,ScrollView,TextInput} from 'react-native';

export default class extends React.Component{
  static defaultProps={
    show:false,
    title:'',
    onCancel:()=>{},
    onSubmit:(text)=>{},
    cancelText:'cancel',
    submitText:'submit',
    cancelStyle:{},
    submitStyle:{},
    style:{},
    inputStyle:{},
    titleStyle:{},
    placeholder:''
  };
  constructor(props){
    super(props);
    this.state={content:''};
  }
  render(){
    return(
      this.props.show?
        <ScrollView style={styles.masker} keyboardDismissMode={'on-drag'}>
          <View style={[styles.container,this.props.style]}>
            {this.props.title?<Text style={[styles.title,this.props.titleStyle]}>{this.props.title}</Text>:null}
            <TextInput
              style={[styles.input,this.props.inputStyle]}
              autoFocus={true}
              onChangeText={(text)=>this.setState({content:text})}
              placeholder={this.props.placeholder}
              underlineColorAndroid={'transparent'}
            />
            <View style={styles.btn_container}>
              <Text style={[styles.btn,this.props.cancelStyle]} onPress={()=>this.props.onCancel()}>{this.props.cancelText}</Text>
              <Text style={[styles.btn,this.props.submitStyle]} onPress={()=>this.props.onSubmit(this.state.content)}>{this.props.submitText}</Text>
            </View>
          </View>
        </ScrollView>:null
    );
  }
}

const styles=StyleSheet.create({
  masker:{
    flex:1,
    alignItems:'center',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,.6)',
    zIndex:100
  },
  container:{
    width:'75%',
    marginTop:150,
    backgroundColor:'#fff',
    borderRadius:10,
    overflow:'hidden'
  },
  title:{
    textAlign:'center',
    paddingTop:13,
    fontSize:15,
    color:'#666',
    fontWeight:'bold'
  },
  input:{
    paddingHorizontal:8,
    height:34,
    backgroundColor:'#eee',
    marginVertical:20,
    borderTopWidth:.5,
    borderBottomWidth:.5,
    borderColor:'#ccc'
  },
  btn_container:{
    flexDirection:'row',
    borderTopWidth:.5,
    borderColor:'#ddd'
  },
  btn:{
    width:'50%',
    textAlign:'center',
    fontWeight:'bold',
    paddingVertical:12
  }
});
