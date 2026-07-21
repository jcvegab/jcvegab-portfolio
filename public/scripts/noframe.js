const videoEmbeds = [
  'iframe[src*="youtube.com"]',
  'iframe[src*="vimeo.com"]',
];

const selector = videoEmbeds.join(',');
const container = document.querySelector('.inner-sm');

if (selector && container) {
  const embeds = container.querySelectorAll(selector);
  embeds.forEach((embed) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText =
      'position:relative;width:100%;height:0;padding-bottom:56.25%;overflow:hidden;';
    Object.assign(embed.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
    });
    if (embed.parentNode) {
      embed.parentNode.insertBefore(wrapper, embed);
      wrapper.appendChild(embed);
    }
  });
}
