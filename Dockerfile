FROM node

WORKDIR /root

RUN set -x \
    && npm install -g yo \
    && chmod 777 -R /root/ \
    && npm install deepexi-scaffold-ui -g

COPY entrypoint.sh /

RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]