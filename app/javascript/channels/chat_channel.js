import consumer from "channels/consumer"

const chatChannel = consumer.subscriptions.create("ChatChannel", {
  connected() {
    console.log("Connected to ChatChannel")
  },

  disconnected() {
  },

  received(data) {
    const messagesContainer = document.getElementById('messages')
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    messageElement.innerHTML = `
      <p>${data.message}</p>
      <small>${data.sent_at}</small>
    `
    messagesContainer.appendChild(messageElement)
  },

  speak(message) {
    this.perform('speak', { message: message })
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('message-input')
  const button = document.getElementById('send-button')

  button.addEventListener('click', () => {
    const message = input.value
    if (message.length > 0) {
      chatChannel.speak(message)
      input.value = ''
    }
  })

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const message = input.value
      if (message.length > 0) {
        chatChannel.speak(message)
        input.value = ''
      }
    }
  })
})
