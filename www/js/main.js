/*
	main.js file
*/
require(['lib/DependencyLoader',
		'BackgroundRenderer',
		'CharacterRenderer',
		'CollisionMap',
		'Agent',
		'Mob',
		'Tileset',
		'Joystix'],
function(DependencyLoader,
		BackgroundRenderer,
		CharacterRenderer,
		CollisionMap,
		Agent,
		Mob,
		Tileset,
		Joystix){
	'use strict';
	var url = "http://anobile.info:8080/Cards/GenerateMap?rows=32&cols=32&max=3";
	var xmlhttp = new XMLHttpRequest();


xmlhttp.onreadystatechange = function() {

//console.log(url);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText).matrix;
        myFunction(xmlhttp.responseText);
//console.log(myArr);
//console.log(JSON.parse(xmlhttp.responseText).matrix);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var matrix = JSON.parse(arr).matrix;
console.log(matrix);
console.log(arr);
var grid = 	[
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[3,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,2,3,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,2,3,0,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,2,3,0,0,0,0,2,1,1,1,1,3,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,2,1,3,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,2,1,1,3,0,0,0,0,0,0,0,0,0,2,1,1,1],
			[3,0,0,0,2,3,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,0,2,3,0,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,2,1,1,1],
			[3,0,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,2,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,2,1,1,0,0,0,2,1,1,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,2,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,2,1,1,0,0,0,2,1,1,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		];
//console.log(grid);
	var map =  matrix,
	/*[
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[3,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,2,3,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,2,3,0,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,2,3,0,0,0,0,2,1,1,1,1,3,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,2,1,3,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,2,1,1,3,0,0,0,0,0,0,0,0,0,2,1,1,1],
			[3,0,0,0,2,3,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,0,2,3,0,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,2,1,1,1],
			[3,0,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,2,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,2,1,1,0,0,0,2,1,1,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,2,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,2,1,1,0,0,0,2,1,1,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		],*/
		tileSize = 24,
		$body = $('body'),
		$window = $(window),
		$canvas,
		canvases = [],
		bgRenderer,
		characterRenderer,
		joystick = new Joystix({
			assumeTouch: true,
			$window: $(window),
			keyboardSpeed: 10
		}),
		spritesToLoad = 2,

		bgTileset = new Tileset({
			spritePath: 'img/canvas.png',
			specPath: 'spec/map.json',
			onReady: loadCb
		}),

		player = new Agent({
			position: {x:1,y:1},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/canvas.png',
				specPath: 'spec/card.json',
				onReady: loadCb
			})
		})/*,
		monster = new Mob({
			position: {x:20,y:10},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/sf2-characters.png',
				specPath: 'spec/sf2-goblin.json',
				onReady: loadCb
			}),
			targetAgent: player
		}),
		monster2 = new Mob({
			position: {x:24,y:7},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/sf2-characters.png',
				specPath: 'spec/sf2-goblin.json',
				onReady: loadCb
			}),
			targetAgent: player
		}),
		monster3 = new Mob({
			position: {x:20,y:4},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/sf2-characters.png',
				specPath: 'spec/sf2-goblin.json',
				onReady: loadCb
			}),
			targetAgent: player
		})*/;

	function loadCb(){
		spritesToLoad--;
		if(!spritesToLoad){ run(); }
	}
	
	function run(){

		// build layers
		_(4).times(function(i){
			$canvas = $('<canvas width="'+(map[0].length * tileSize)+'" height="'+(map.length * tileSize)+'" data-index="'+i+'" class="gamecanvas canvas'+i+'"/>');
			$body.append($canvas);
			canvases.push($canvas);
		});


		// start renderers
		bgRenderer = new BackgroundRenderer({
			$el: canvases[1],
			map: map,
			tileSet: bgTileset,
			tileSize: tileSize
		});
		characterRenderer = new CharacterRenderer({
			$el: canvases[2],
			tileSize: tileSize,
			agents: [
				player,
				//monster,
				//monster2,
				//monster3
			]
		});


		// input
		joystick.onMove(function(movement){
			player.doMove(movement.x1 * 0.01, movement.y1 * 0.01);
		});


		// run game
		function gameLoop(){
			characterRenderer.draw();
			//monster.chooseAction();
			//monster2.chooseAction();
			//monster3.chooseAction();

			window.requestAnimationFrame(gameLoop);
		}
		gameLoop();

		centerCanvases();
	}


	// resize
	function centerCanvases(){
		_(canvases).each(function($canvas){
			$canvas.css({
				top: ($window.height() - $canvas.height())/2
			});
		});
	}
	$window.resize(_.throttle(centerCanvases,250));

}
});