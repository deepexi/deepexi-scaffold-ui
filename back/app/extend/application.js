'use strict';

module.exports = {
  getCache(id) {
    this.messenger.sendToAgent('get_cache', id);
    this.messenger.on('get_send_cache', data => {
      this.cacheData = data;
    });
  },

  setOrUpdateCache(sid, cache) {
    this.messenger.sendToAgent('set_cache', { id: sid, cacheValue: cache });
  },

  cleanCache() {
    this.messenger.sendToAgent('clear_cache', {});
  },
};
