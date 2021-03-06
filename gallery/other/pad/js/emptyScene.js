class PadWorld extends $$.SubWorld {
	constructor(sceneOpt,cameraOpt) {
		super(sceneOpt,cameraOpt);
		this.state="";
		this.isAppWorld=false;
		this.onClick = function(){console.log("click")};
		this.onUp = function(){console.log("up")};
		this.onDown = function(){console.log("down")};
		this.onMove = function(){console.log("move")};
		this.onBack = function(){console.log("back")};
	}
}

function createEmptyWorld() {
	var world = new PadWorld({
		clearColor: 0x000000,
		resize: false,
		name: "empty"
	}, {});

	world.onBack = function() {
		if(pad.state == "close") {
			pad.state = "lock";
			if(!lockWorld) {
				lockWorld = createLockWorld();
			}
			pad.changeFBO(lockWorld);
			for(var i in lockWorld.dom) {
				lockWorld.dom[i].element.material.opacity = 0;
			}
			var opa = {
				a: 0
			};
			new TWEEN.Tween(opa).to({
				a: 1
			}, 500).start().onUpdate(function() {
				for(var i in lockWorld.dom) {
					lockWorld.dom[i].element.material.opacity = this.a;
				}
			});
		}
	}

	return world;
}

var tmpWorld = new PadWorld({
	clearColor: 0x000000,
	resize: false,
	name: "transistion"
}, {
	type: "OrthographicCamera",
	near: -10,
	far: 10
});