// thanh tự động trượt
const initLevelSlider = () => {
    const slider = document.getElementById('levelsSlider');
    if (!slider) return;
    
    const track = slider.querySelector('.levels-track');
    const cards = track.querySelectorAll('.level-card-container');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    // Nếu không có đủ card, không thực hiện infinite scroll
    if (cards.length < 2) return;
    
    // Tạo slider vô hạn bằng cách sao chép card đầu tiên và cuối cùng
    const firstCardClone = cards[0].cloneNode(true);
    const lastCardClone = cards[cards.length - 1].cloneNode(true);
    
    firstCardClone.classList.add('clone');
    lastCardClone.classList.add('clone');
    
    // Thêm clone vào đầu và cuối
    track.appendChild(firstCardClone);
    track.insertBefore(lastCardClone, cards[0]);
    
    // Tính toán kích thước
    let cardWidth = cards[0].offsetWidth;
    let gap = parseInt(window.getComputedStyle(track).columnGap || '24');
    let containerWidth = slider.offsetWidth;
    let scrollAmount = cardWidth + gap; // Bắt đầu từ card thứ 2 (sau clone)
    
    // Di chuyển đến vị trí bắt đầu (sau card clone)
    track.style.transform = `translateX(-${scrollAmount}px)`;
    
    // Các biến cho tự động cuộn
    let autoScrollInterval;
    const autoScrollDelay = 3000;
    let isTransitioning = false;
    
    // Bắt đầu tự động cuộn
    const startAutoScroll = () => {
      stopAutoScroll();
      
      autoScrollInterval = setInterval(() => {
        scrollNext(true);
      }, autoScrollDelay);
    };
    
    // Dừng tự động cuộn
    const stopAutoScroll = () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    };
    
    // Xử lý sự kiện transitionend để tạo hiệu ứng vô hạn
    const handleTransitionEnd = () => {
      if (!isTransitioning) return;
      
      // Xóa transition để nhảy ngay lập tức
      track.style.transition = 'none';
      
      const allCards = track.querySelectorAll('.level-card-container');
      const cardsCount = allCards.length;
      
      // Nếu đang ở card cuối (thực tế là clone đầu tiên), nhảy đến vị trí thực của card đầu
      if (scrollAmount >= (cardsCount - 2) * (cardWidth + gap)) {
        scrollAmount = cardWidth + gap;
      } 
      // Nếu đang ở card đầu (thực tế là clone cuối cùng), nhảy đến vị trí thực của card cuối
      else if (scrollAmount <= 0) {
        scrollAmount = (cardsCount - 3) * (cardWidth + gap);
      }
      
      track.style.transform = `translateX(-${scrollAmount}px)`;
      
      // Đợi một chút và thêm lại transition
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease';
        isTransitioning = false;
      }, 10);
    };
    
    // Thêm transition cho mượt
    track.style.transition = 'transform 0.5s ease';
    track.addEventListener('transitionend', handleTransitionEnd);
    
    // Xử lý cập nhật khi thay đổi kích thước màn hình
    const handleResize = () => {
      cardWidth = cards[0].offsetWidth;
      gap = parseInt(window.getComputedStyle(track).columnGap || '24');
      containerWidth = slider.offsetWidth;
      
      // Cập nhật vị trí
      track.style.transition = 'none';
      track.style.transform = `translateX(-${scrollAmount}px)`;
      
      // Thêm lại transition sau khi cập nhật
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease';
      }, 10);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Xử lý nút Previous
    const scrollPrev = (isAuto = false) => {
      if (isTransitioning && !isAuto) return;
      isTransitioning = true;
      
      scrollAmount -= cardWidth + gap;
      track.style.transform = `translateX(-${scrollAmount}px)`;
    };
    
    // Xử lý nút Next
    const scrollNext = (isAuto = false) => {
      if (isTransitioning && !isAuto) return;
      isTransitioning = true;
      
      scrollAmount += cardWidth + gap;
      track.style.transform = `translateX(-${scrollAmount}px)`;
    };
    
    prevBtn.addEventListener('click', () => {
      stopAutoScroll();
      scrollPrev();
      startAutoScroll();
    });
    
    nextBtn.addEventListener('click', () => {
      stopAutoScroll();
      scrollNext();
      startAutoScroll();
    });
    
    // Chức năng vuốt trên thiết bị cảm ứng
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    
    const dragStart = (e) => {
      stopAutoScroll();
      
      if (e.type === 'touchstart') {
        startPos = e.touches[0].clientX;
      }
      isDragging = true;
      currentTranslate = scrollAmount;
    };
    
    const drag = (e) => {
      if (isDragging) {
        const currentPosition = e.touches[0].clientX;
        const diff = startPos - currentPosition;
        
        // Áp dụng kéo
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentTranslate + diff}px)`;
      }
    };
    
    const dragEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      const currentPosition = e.changedTouches[0].clientX;
      const diff = startPos - currentPosition;
      
      // Quyết định swipe direction
      if (Math.abs(diff) > 50) { // Min swipe distance
        if (diff > 0) {
          scrollNext();
        } else {
          scrollPrev();
        }
      } else {
        // Không đủ khoảng cách, quay lại vị trí ban đầu
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = `translateX(-${scrollAmount}px)`;
      }
      
      startAutoScroll();
    };
    
    track.addEventListener('touchstart', dragStart);
    track.addEventListener('touchend', dragEnd);
    track.addEventListener('touchmove', drag);
    
    // Dừng tự động cuộn khi hover vào slider
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);
    
    // Bắt đầu tự động cuộn
    startAutoScroll();
    
    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      prevBtn.removeEventListener('click', () => scrollPrev());
      nextBtn.removeEventListener('click', () => scrollNext());
      track.removeEventListener('touchstart', dragStart);
      track.removeEventListener('touchend', dragEnd);
      track.removeEventListener('touchmove', drag);
      track.removeEventListener('transitionend', handleTransitionEnd);
      slider.removeEventListener('mouseenter', stopAutoScroll);
      slider.removeEventListener('mouseleave', startAutoScroll);
      stopAutoScroll();
    };
  };
  
  export default initLevelSlider;