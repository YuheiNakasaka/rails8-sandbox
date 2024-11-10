class GuestsCleanupJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Rails.logger.info "GuestsCleanupJob is running"
    sleep 5
    Rails.logger.info "GuestsCleanupJob is done"
  end
end
