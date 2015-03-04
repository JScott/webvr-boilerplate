//var event = new CustomEvent('build', { 'info': 'here' });

var jerk = {};
var absJerk = {};
var accel = {};
var sequence = 0;
var event = new Event('cardboardjerk');

window.addEventListener('devicemotion', function(evt){
  // jerk = delta of acceleration
  jerk.x = evt.acceleration.x ? (evt.acceleration.x-accel.x).toFixed(2) : 0;
  jerk.y = evt.acceleration.y ? (evt.acceleration.y-accel.y).toFixed(2) : 0;
  jerk.z = evt.acceleration.z ? (evt.acceleration.z-accel.z).toFixed(2) : 0;

  // store the absolute values for later calculations
  for(var value in jerk) {
    absJerk[value] = jerk[value];
  }

  // store the new acceleration
  accel.x = evt.acceleration.x ? evt.acceleration.x.toFixed(2) : 0;
  accel.y = evt.acceleration.y ? evt.acceleration.y.toFixed(2) : 0;
  accel.z = evt.acceleration.z ? evt.acceleration.z.toFixed(2) : 0;

  var threshold = {}
  threshold.min = 0.8;
  threshold.max = 1.2;
  if ((absJerk.x > threshold.min && absJerk.x < threshold.max) || 
      (absJerk.y > threshold.min && absJerk.y < threshold.max) || 
      (absJerk.z > threshold.min && absJerk.z < threshold.max)) {
    sequence++;
  }
  else {
    if (sequence > 1 && sequence < 4) {
      alert('hi: '+sequence);
    }
    sequence = 0;
  }

  if (false) {
    alert(jerk.x + ' // ' + jerk.y + ' // ' + jerk.z + "\n" + accel.x + ' // ' + accel.y + ' // ' + accel.z + "\n");
    window.dispatchEvent('cardboardjerk');
  }
});