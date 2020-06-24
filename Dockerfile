FROM node

RUN npm config set registry https://registry.npm.taobao.org \
    && npm install -g yo \
    && npm install deepexi-scaffold-ui -g \
    && mkdir -p /root/.config/insight-nodejs .yo-repository \
    && chmod 777 -R /root/ \
    && yo -v

COPY entrypoint.sh /

RUN chmod +x /entrypoint.sh

EXPOSE 7001

CMD ["/entrypoint.sh"]