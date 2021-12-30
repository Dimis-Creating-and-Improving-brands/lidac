const positioned = [...document.querySelectorAll('.positioned-block')];


const onResize = _ => {
    const positionedHeightSum = positioned.reduce((acc, curr) => acc + curr.clientHeight, 0);
    document.querySelector('.scrollable-content').style.height = `${positionedHeightSum}px`;
}

const onScroll = _ => {
    const bottomY = window.scrollY + window.innerHeight;
    if (bottomY - 30 > positioned.length * window.innerHeight) {
        positioned.forEach(block => {
            block.style.position = `static`;
        })
    } else {
        positioned.forEach((block, index) => {
            const height = block.clientHeight;
            const opacity = ((height * (index + 1)) - scrollY) / height;
            if (opacity <= 1.2 && opacity >= 0.9) block.classList.add('animated');
            block.style.pointerEvents = opacity < 0.3 ? 'none' : 'unset';
            block.style.position = `fixed`;
            block.style.opacity = `${opacity}`;
        })
    }
}


window.addEventListener('scroll', onScroll);
window.addEventListener('resize', onResize);

onScroll();
onResize();
