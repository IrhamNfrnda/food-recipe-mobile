import React, {useState, useCallback, useEffect, useContext} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import EmojiSelector from 'react-native-emoji-selector';
import {Keyboard} from 'react-native';
import { AppContext } from '../../AppContext';

export default function ChatScreen({ navigation }) {
    const [messages, setMessages] = useState([]);
    const [showEmoji, setShowEmoji] = useState(false);
    const [text, setText] = useState('');
    const [user, setUser] = useState(null);
    const { token } = useContext(AppContext);


    useEffect(() => {
      if (!token) {
        // Redirect to login screen if token is not defined
        navigation.navigate('Login');
      }
    }, []);
  
    if (!token) {
      // If token is not defined, don't render the screen
      return null;
    }
  
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          image:
            'https://gravatar.com/avatar/0898e56656e0aa2cdd0ee87e7ab341dc?s=400&d=robohash&r=x',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar:
              'https://gravatar.com/avatar/0898e56656e0aa2cdd0ee87e7ab341dc?s=400&d=robohash&r=x',
          },
        },
      ]);
    }, []);
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    }, []);
  
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
  
        {/* Body Chat */}
        <GiftedChat
          messages={messages}
          onSend={messages => {
            onSend(messages);
          }}
          user={{
            _id: user?.id,
            name: user?.fullname,
            avatar:
              'https://gravatar.com/avatar/0898e56656e0aa2cdd0ee87e7ab341dc?s=400&d=robohash&r=x',
          }}
          onInputTextChanged={value => {
            setShowEmoji(false);
            setText(value);
          }}
          textInputProps={{onSubmitEditing: () => setShowEmoji(false)}}
          text={text}
          alwaysShowSend
          renderActions={() => (
            <View style={{height: '100%', justifyContent: 'center', left: 5}}>
              <TouchableOpacity
                onPress={() => {
                  setShowEmoji(true);
                  Keyboard.dismiss();
                }}>
                <Icon name="smile-o" size={20} />
              </TouchableOpacity>
            </View>
          )}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: 'white',
                  },
                  left: {
                    color: '#24204F',
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: '#E6F5F3',
                  },
                }}
              />
            );
          }}
        />
  
        {showEmoji ? (
          <EmojiSelector onEmojiSelected={emoji => setText(`${text}${emoji}`)} />
        ) : null}
      </View>
    );
  }