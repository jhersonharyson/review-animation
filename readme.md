use vectr to create a svg image and export to html, after get the path using code below

```javascript

const types = ['upsad', 'excited', 'eyes', 'smile', 'sad', 'neutral']
const x = document.getElementsByTagName('path')
let output = {}
for(let i = 0; i < x.length; i++)output[types[i]] = x[i].getAttribute('d')

```

yarn add react-native-css-gradient popmotion flubber @expo/vector-icons

expo install react-native-svg