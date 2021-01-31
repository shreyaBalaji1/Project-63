import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
    getWord = (word) => {
        var searchKeyword = word.toLowerCase();
        var url = "https://rupinwhitehatjr.github.io/dictionary/%22" + searchKeyword + "%22.json";
        return fetch (url)
        .then((data)=>{
            if(data.status === 200) {
                return data.json();
            }
            else{
                return null;
            }
        })
        .then((response)=> {
            var responseObject = response;

            if(responseObject) {
                var wordData = responseObject.definitions[0];
                var definition = wordData.description;
                var lexicalCategory = wordData.wordtype;

                this.setState({
                    "word": this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexicalCategory
                });
            }
            else{
                this.setState({
                    "word": this.state.text,
                    "definition": "Not Found"
                });
            }
        });
    }
    render() {
        return(
            <View style = {styles.container}>
                <View style = {styles.inputBoxContainer}>
                    <TextInput 
                        style = {styles.inputBox}
                        onChangeText = {text => {
                            this.setState({
                                text: text,
                                isSearchPressed: false,
                                words: "Loading...",
                                lexicalCategory: "",
                                examples: [],
                                definition: ""
                            });
                        }}
                        value = {this.state.text}/>
                </View>
                <TouchableOpacity 
                style = {styles.searchButton}
                onPress = {() => {
                    this.setState({ isSearchPressed: true });
                    this.getWord(this.state.text);
                }}>
                <Text style = {styles.buttonText}>Search</Text>
                </TouchableOpacity>

                
                <View style = {styles.outputContainer}>
                    <Text style = {{fontSize: 20}}>
                        {this.state.isSearchPressed && this.state.word === "Loading..."?this.state.word :""}
                    </Text>
                    {this.state.word!=="Loading..."? (
                    <View>
                        <View style = {styles.detailsContainer}>
                            <Text style = {styles.detailsTitle}>
                                Word: {" "}
                            </Text>
                            <Text style = {{fontSize: 18}}>
                                {this.state.word}
                            </Text>
                        </View>

                        <View style = {styles.detailsContainer}>
                            <Text style = {styles.detailsTitle}>
                                Type: {" "}
                            </Text>
                            <Text style = {{fontSize: 18}}>
                                {this.state.lexicalCategory}
                            </Text>
                        </View>

                        <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Text style = {styles.detailsTitle}>
                                Definition: {" "}
                            </Text>
                            <Text style = {{fontSize: 18}}>
                                {this.state.definition}
                            </Text>
                        </View>
                    </View>
    ): null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputBoxContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '80%',
        alignSelf: 'center',
        height: 40,

    },
    searchButton: {
        textAlign: 'center',
        color: "black"
    },
    buttonText: {
        textAlign: 'center',
        color: "black"
    }
})