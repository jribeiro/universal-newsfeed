

import test from 'ava';
import {shallow} from 'enzyme';
import React from 'react';
import {Message} from './Message';
import TimeAgo from 'react-timeago'

const data = {
    id: '1',
    subject: "Are you ready for the truth?",
    body: "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man.",
    posted_at: '2005',
    topics: ['foo'],
    tags: ['bar'],
    comments: ['1', '2'],
    author: {
        display_name: 'Samuel L. Jackson',
        img: ''
    }
};

test('should display subject, time, body, comments, action', t => {
    t.plan(5);
    const props = { onClick: () => t.pass(), message: Object.assign({}, data) };
    const wrapper = shallow(<Message {...props} />);

    t.true(wrapper.contains(<h2>{props.message.subject}</h2>));
    t.true(wrapper.containsMatchingElement(<TimeAgo date="2005"/>));
    t.true(wrapper.find('.content').html().indexOf(props.message.body) > -1);
    t.is(wrapper.find('a').text(), 'View 2 Comments');
    wrapper.find('a').simulate('click');
});

test('should not display the view comments button when comments are displayed', t => {
    const props = { onClick: () => {}, message: Object.assign({
        showComments: true
    }, data) };
    const wrapper = shallow(<Message {...props} />);

    t.is(wrapper.find('a').length, 0);
});
