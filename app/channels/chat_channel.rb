class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
    puts "subscribed"
  end

  def unsubscribed
  end

  def speak(data)
    message = data["message"]
    ActionCable.server.broadcast(
      "chat_channel",
      { message: message, sent_at: Time.now.strftime("%H:%M") }
    )
    puts "broadcast"
  end
end
