'use strict';

module.exports = agent => {
  agent.scaffoldCacheMap = new Map();

  agent.messenger.on('set_cache', data => {
    const id = data.id;
    const cacheVal = { ...data.cacheValue, ...agent.scaffoldCacheMap.get(id) };
    agent.scaffoldCacheMap.set(data.id, cacheVal);
  });


  agent.messenger.on('get_cache', id => {
    agent.messenger.sendToApp('get_send_cache', agent.scaffoldCacheMap.get(id));
  });

  agent.messenger.on('clear_cache', data => {
    agent.scaffoldCacheMap.set(data.id, data.cacheValue);
  });


};
