const cont_2 = document.getElementById('cont_2');
const slider = document.getElementById('slider');
const s_wid = slider.offsetWidth;
const s_li = slider.children;
const indi_bar = document.getElementById('indi_bar');
let win_wid = window.innerWidth;
let s_move_max = (s_wid - (win_wid / 2)) * -1;
let s_pos = 0;
let li_pos = 0;
let pct = 0;

cont_2.addEventListener('wheel', function(e) {
  e.preventDefault();

  if (s_pos >= 0 && e.deltaY < 0) {
    hideContainer();
    return;
  }

  move_slider(e.deltaY);
  on_indicator();
});

function move_slider(amount) {
  s_pos -= amount;
  if (s_pos < s_move_max) {
    s_pos = s_move_max;
  } else if (s_pos > 0) {
    s_pos = 0;
  }
  slider.style.transform = `translateX(${s_pos}px)`;
  move_sliderY(amount);
}

function move_sliderY(amount) {
    if (s_pos === s_move_max) {
      const containerHeight = cont_2.offsetHeight;
      const sliderHeight = slider.offsetHeight;
      const availableScrollHeight = containerHeight - sliderHeight;
  
      if (cont_2.scrollTop + amount > availableScrollHeight) {
        cont_2.scrollTop = availableScrollHeight;
      } else if (cont_2.scrollTop + amount < 0) {
        cont_2.scrollTop = 0;
      } else {
        cont_2.scrollTop += amount;
      }
    }
  }
  

function on_indicator() {
  pct = (s_pos * -1) * 100 / s_move_max;
  indi_bar.style.clipPath = `polygon(0% 0%, ${pct}% 0%, ${pct}% 100%, 0% 100%)`;
}
