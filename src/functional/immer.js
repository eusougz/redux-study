import { produce } from 'immer';

let book = { title: 'Harry potter' };

function publish(book) { 
    return produce(book, draftBook => {
        draftBook.isPublished = true;
    })
}

let updated = publish(book);
