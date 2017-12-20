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
    placeholder:'',
    num:1,
    content:[]
  };
  constructor(props){
    super(props);
    this.state={content:[]};
  }
  render(){
    const content=this.state.content;
    const myContent=[];
    const num=this.props.num;
    if(!this.props.content||this.props.content.length!==num) {
      for (let i = 0; i < num; i++)
        myContent.push(
          <TextInput
            style={[styles.input, this.props.inputStyle]}
            autoFocus={i===0?true:false}
            onChangeText={(text) => {
              content[i] = text;
              this.setState({content: content});
            }}
            placeholder={this.props.placeholder}
            underlineColorAndroid={'transparent'}
          />
        );
    }
    else
      for(let i=0;i<num;i++)
        myContent.push(this.props.content[i]);
    return(
      this.props.show?
        <ScrollView style={styles.masker} keyboardDismissMode={'on-drag'}>
          <View style={[styles.container,this.props.style]}>
            {this.props.title?(typeof this.props.title==='string'?<Text style={styles.title}>{this.props.title}</Text>:this.props.title):null}
            {myContent}
            <View style={styles.btn_container}>
              <Text style={[styles.btn,this.props.cancelStyle]} onPress={()=>this.props.onCancel()}>{this.props.cancelText}</Text>
              <Text style={[styles.btn,this.props.submitStyle]} onPress={()=>this.props.onSubmit(num===1?this.state.content[0]:this.state.content)}>{this.props.submitText}</Text>
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
    paddingHorizontal:6,
    fontSize:15,
    color:'#666',
    fontWeight:'bold',
    lineHeight:20,
    marginBottom:10
  },
  input:{
    paddingHorizontal:8,
    height:34,
    backgroundColor:'#eee',
    marginVertical:10,
    borderTopWidth:.5,
    borderBottomWidth:.5,
    borderColor:'#ccc',
    fontSize:15
  },
  btn_container:{
    flexDirection:'row',
    borderTopWidth:.5,
    borderColor:'#ddd',
    marginTop:10
  },
  btn:{
    width:'50%',
    textAlign:'center',
    fontWeight:'bold',
    paddingVertical:12
  }
});
