const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')
const {BandsData, MusicianData} = require('./seedData')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        /**
         * Create a new instance of a band using the Band Model
         *  Check to see if the name passed into the object is in fact the correct on the new instance
         **/
        const newBand = await Band.create(BandsData[0]);
        expect(newBand.name).toBe(BandsData[0].name);
    })
    test('that count is autoincrementing', async () =>{
        const band = await Band.create(BandsData[0]);
        const band2 = await Band.create(BandsData[1]);

        expect(band2.showCount).toBe(3);
    })

    test('can update Band name', async () => {
        const newBand3 = await Band.create(BandsData[0]);
        const updatedBand = await newBand3.update({
            name: 'Peggy'
        })
        expect(updatedBand.name).toBe('Peggy')
        
    })

    test('deleting a Band', async () => {
        const newBand2 = await Band.create(BandsData[0]);
        const deletedBand = await newBand2.destroy();
        expect(Band.length).toBe(0);
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        /**
         * Create a new instance of a musician using the Musician Model
         *  Check to see if the name or intrument passed into the object is infact the correct on the new instance
         **/
        const newMusician = await Musician.create(MusicianData[0]);
        expect(newMusician.name).toBe(MusicianData[0].name);
    })

    test('can update Band name', async () => {
        const newMusician3 = await Musician.create(MusicianData[0]);
        const updatedMusician = await newMusician3.update({
            name: 'Sally'
        })
        expect(updatedMusician.name).toBe('Sally')
        
    })

    test('deleting a Musician', async () => {
        const newMusician2 = await Musician.create(MusicianData[0]);
        const deletedMusician = await newMusician2.destroy();
        expect(Musician.length).toBe(0);
    })


    /*
     * Optional test to show associations:
        - I've completed this test for you
        - I've left it here for you to see how to go about testing associations 
    */
   

    test('Band can have many Musicians', async () => {
        await sequelize.sync({ force: true }); // recreate db
        let BigBang = await Band.create({ name: 'BIGBANG', genre: 'KPOP' }); //create band
        let GD = await Musician.create({ name: 'G-Dragon', instrument: 'Voice' }); //create musician
        let Top = await Musician.create({ name: 'TOP', instrument: 'Voice' }); //create musician
    
        await BigBang.addMusician(GD); //add musician to band
        await BigBang.addMusician(Top); //add musician to band
    
        const musicians = await BigBang.getMusicians(); //get all musicians in band - returns an array
    
        expect(musicians.length).toBe(2); //we've added two musicians, so the length should be two
        expect(musicians[0] instanceof Musician).toBeTruthy; //checks that the value at index 0 of the list - a musician object, is in fact a musician object
      });

      //test for association between bands and songs

      test('Band can have many songs', async () => {
        await sequelize.sync({ force: true }); // recreate db
        let BigBang = await Band.create({ name: 'BIGBANG', genre: 'KPOP' }); //create band
        let Haru = await Song.create({ name: 'Haru Haru', instrument: 'Voice' }); //create musician
        let MH = await Song.create({ name: 'My Heaven', instrument: 'Voice' }); //create musician
    
        await BigBang.addSong(Haru); //add song to band
        await BigBang.addSong(MH); //add song to band
    
        const songs = await BigBang.getSongs(); //get all musicians in band - returns an array
    
        expect(songs.length).toBe(2); //we've added two musicians, so the length should be two
        expect(songs[0] instanceof Song).toBeTruthy; //checks that the value at index 0 of the list - a musician object, is in fact a musician object
      });
})