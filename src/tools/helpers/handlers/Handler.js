
define([
  'S',
  'lib/strongforce',
  'tools/helpers/handlers/HandlerRender',
  'scene/metrics'
], function (S, strongforce, HandlerRender, metrics) {

  var Model = strongforce.Model;

  function Handler(directions) {
    Model.apply(this);
    this._threshold = 10;
    this._setDirections(directions);
    this.setPosition([0, 0, 0]);
  }
  S.theClass(Handler).inheritsFrom(Model);

  Handler.prototype.getPosition = function () {
    if (!this._position) { return null; }
    return this._position.slice(0);
  };

  Handler.prototype.setPosition = function (newPosition) {
    var oldPosition = this.getPosition();
    this._position = newPosition.slice(0);
    this._screenPosition = metrics.getScreenCoordinates(this._position);
    this.dispatchEvent('positionChanged', {
      oldPosition: oldPosition,
      screenPosition: this._screenPosition.slice(0),
      position: this.getPosition()
    });
  };

  Handler.prototype.setEnabled = function (enabled) {
    this._enabled = enabled;
    this.dispatchEvent('stateChanged', {
      isEnabled: enabled,
      position: this.getPosition(),
      screenPosition: this._screenPosition.slice(0)
    });
  };

  Handler.prototype.isEnabled = function () {
    return this._enabled;
  };

  Handler.prototype.getDirections = function () {
    return this._directions;
  };

  Handler.prototype._setDirections = function (directions) {
    this._directions = directions;
    this.dispatchEvent('directionsSet', {
      directions: directions
    });
  };

  Handler.prototype.render = HandlerRender;

  return Handler;
});
