
import test from 'ava';
import {shallow} from 'enzyme';
import React from 'react';
import {Comment} from './Comment';
import TimeAgo from 'react-timeago'

const data = {
    id: '1',
    body: "Test Comment.",
    posted_at: '2016',
    author: {
        display_name: 'Samuel L. Jackson',
        avatar: ''
    }
};

test('should display body, timeAgo, display_name', t => {

    const props = { onClick: () => t.pass(), comment: Object.assign({}, data) };
    const wrapper = shallow(<Comment {...props} />);

    t.is(wrapper.find('img').length, 1);
    t.true(wrapper.containsMatchingElement(<TimeAgo date="2016"/>));
    t.is(wrapper.find('.details').length, 1);
});

