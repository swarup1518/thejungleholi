(function(){
    const thumbs = Array.from(document.querySelectorAll(".gallery .thumb"));
    const lightbox = document.getElementById("lightbox");
    const lbImage = document.getElementById("lbImage");
    const lbCaption = document.getElementById("lbCaption");
    const lbThumbs = document.getElementById("lbThumbs");
    const lbClose = document.getElementById("lbClose");
    const lbPrev = document.getElementById("lbPrev");
    const lbNext = document.getElementById("lbNext");
  
    let currentIndex = 0;
  
    const items = thumbs.map(t => {
      const img = t.querySelector("img");
      return { src: img.src, alt: img.alt };
    });
  
    // Build lightbox thumbnails
    items.forEach((item, i) => {
      const btn = document.createElement("button");
      btn.className = "lb-thumb";
      btn.dataset.index = i;
      btn.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
      btn.onclick = () => show(i);
      lbThumbs.appendChild(btn);
    });
  
    function open(i){
      currentIndex = i;
      update();
      lightbox.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", keyHandler);
    }
  
    function close(){
      lightbox.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", keyHandler);
    }
  
    function show(i){
      currentIndex = (i + items.length) % items.length;
      update();
    }
  
    function update(){
      const item = items[currentIndex];
      lbImage.src = item.src;
      lbCaption.textContent = item.alt;
  
      lbThumbs.querySelectorAll(".lb-thumb").forEach((el, i) =>
        el.classList.toggle("active", i === currentIndex)
      );
    }
  
    function keyHandler(e){
      if(e.key === "Escape") close();
      if(e.key === "ArrowLeft") show(currentIndex - 1);
      if(e.key === "ArrowRight") show(currentIndex + 1);
    }
  
    // Attach listeners
    thumbs.forEach((t, i) => t.onclick = () => open(i));
    lbClose.onclick = close;
    lbPrev.onclick = () => show(currentIndex - 1);
    lbNext.onclick = () => show(currentIndex + 1);
  
    lightbox.onclick = e => {
      if (e.target === lightbox) close();
    };
  
  })();
  