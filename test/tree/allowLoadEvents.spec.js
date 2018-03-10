const expect = require('chai').expect;
const InspireTree = require('../../' + (process.env.DIST ? 'dist' : 'build') + '/inspire-tree');
const sinon = require('sinon');

describe('config.allowLoadEvents', function() {
    it('fires the node.selected event for pre-selected node', function() {
        const tree = new InspireTree({
            allowLoadEvents: ['selected'],
            data: []
        });

        const callback = sinon.spy();

        tree.on('node.selected', callback);

        tree.load([{
            text: 'A',
            id: 1,
            itree: {
                state: {
                    selected: true
                }
            }
        }]);

        callback.should.have.been.called;
    });

    it('passes a true isLoadEvent argument', function(done) {
        const tree = new InspireTree({
            allowLoadEvents: ['selected'],
            data: []
        });

        tree.on('node.selected', function(node, isLoadEvent) {
            try {
                expect(isLoadEvent).to.be.true;
                done();
            }
            catch (e) {
                done(e);
            }
        });

        tree.load([{
            text: 'A',
            id: 1,
            itree: {
                state: {
                    selected: true
                }
            }
        }]);
    });
});
