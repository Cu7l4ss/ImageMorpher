// PrototypeJS Based ImageMorpher
/********************************************************************************************
* Created By: Shlomo Zfira                                                                  *
* Description:                                                                              *
* Swaping Images with Fade by horizontally changing their background-position property.     *
* @args:                                                                                    *
* element: ID of the element on page.                                                       *
* arrWidth: array of Widths of each image in the master image.                              *
* arrPos: array of X position for each image starting point;                                *
* numPics: number of pictures to be swapped;                                                *
*                                                                                           *
*********************************************************************************************/
var ImageMorpher = new Class.create({
    initialize: function(element, arrWidth ,arrPos, numPics){
        this._el = $(element);
        this._arrWidth = arrWidth;
        this._arrPos = arrPos;
        this._iterate = 0;
        this._numOfPics = numPics;
        this._ple = new PeriodicalExecuter(this.initMorph.bind(this), 4);
        this._ff = true;
    },

    initMorph: function(ples){
        if(this._ff){
            this._ff = false;
            this._iterate = 1;
        }
        if(this._iterate == this._numOfPics)
            this._iterate = 0;
        this.MorphEffect();
        this._iterate++;
    },

    MorphEffect: function(){
        var width = this._arrWidth[this._iterate];
        var xS = this._arrPos[this._iterate];
        new Effect.Fade(this._el, {duration: 0.5, from:1, to:0});
        new Effect.Morph(this._el, {style:'background-position:-'+xS+'px 0;width:'+width+'px;',duration:0.01, queue: 'end'});
        new Effect.Appear(this._el,{duration:0.5, from: 0, to:1, queue: 'end'});
    }
});