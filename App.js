import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Task from './components/TaskItem'

const App = () => {
  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    Keyboard.dismiss()
    if (task === null) {
      alert('Please write your task !')
    } else {
      setTaskItems([...taskItems, task])
    }

    setTask(null)
    console.log(taskItems)
  }

  const completeTask = (index) => {
    let copyTaskItems = [...taskItems]
    copyTaskItems.splice(index, 1)
    setTaskItems(copyTaskItems)
    console.log(taskItems)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {taskItems &&
            taskItems.map((taskItem, index) => {
              return (
                <>
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task key={index} text={taskItem} />
                  </TouchableOpacity>
                </>
              )
            })}
        </View>
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder='Write a task here'
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addTask}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    maxHeight: '80%',
    flexGrow: 0
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 250,
    backgroundColor: '#B7DBF0',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 50
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#B7DBF0',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addTask: {}
})

export default App
