import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IDM, IChat } from '@typings/db';
import React, { RefObject, useCallback, VFC } from 'react';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  scrollbarRef: RefObject<Scrollbars>;
  chatSections: { [key: string]: IDM[] };
  isReachingEnd: boolean;
  isEmpty: boolean;
  setSize: (f: (size: number) => number) => Promise<IDM[][] | undefined>;
}

const ChatList: VFC<Props> = ({ scrollbarRef, chatSections, isEmpty, setSize, isReachingEnd }) => {
  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
        console.log('가장 위');
        // 데이터 추가 로딩
        setSize((prevSize) => prevSize + 1).then(() => {
          // 스크롤 위치 유지
          scrollbarRef.current?.scrollTop(scrollbarRef.current?.getScrollHeight() - values.scrollHeight);
        });
      }
    },
    [setSize, scrollbarRef, isReachingEnd, isEmpty],
  );

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats?.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
