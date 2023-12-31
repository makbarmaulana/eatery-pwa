const LikeButtonPresenter = {
  async init({ button, restaurant, favoriteRestaurants }) {
    this._button = button;
    this._restaurant = restaurant;
    this._favoriteRestaurant = favoriteRestaurants;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;
    const isRestaurantExist = await this._isRestaurantExist(id);

    if (isRestaurantExist) {
      this._renderLike(id);
    } else {
      this._renderUnlike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  _renderUnlike() {
    this._updateHeartIconClasses('fa-heart-o', 'fa-heart');
    this._updateAriaLabel('like this restaurant');

    this._button.addEventListener('click', async () => {
      await this._favoriteRestaurant.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderLike(id) {
    this._updateHeartIconClasses('fa-heart', 'fa-heart-o');
    this._updateAriaLabel('unlike this restaurant');

    this._button.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(id);
      this._renderButton();
    });
  },

  _updateHeartIconClasses(add, remove) {
    const heartIcon = this._button.querySelector('i.fa');
    heartIcon.classList.remove(remove);
    heartIcon.classList.add(add);
  },

  _updateAriaLabel(label) {
    this._button.setAttribute('aria-label', label);
  },
};

export default LikeButtonPresenter;
