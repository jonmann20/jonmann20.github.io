'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListCarousel = function () {
	function ListCarousel(list) {
		var _this = this;

		_classCallCheck(this, ListCarousel);

		var id = void 0,
		    active = 'default',
		    span = document.createElement('span'),
		    links = Array.from(list.querySelectorAll('a'));

		span.classList.add('icon-link');
		span.style.paddingLeft = '3px';

		links.forEach(function (link) {
			link.addEventListener('click', function (e) {
				id = e.target.id;

				if (id && active !== id) {
					e.preventDefault();

					link.appendChild(span);

					document.querySelector('#div' + _this.capitalize(active)).classList.remove('fade-in');

					document.querySelector('#div' + _this.capitalize(id)).classList.add('fade-in');

					active = id;
				}
			});
		});
	}

	_createClass(ListCarousel, [{
		key: 'capitalize',
		value: function capitalize(s) {
			return s.replace(/(?:^|\s)\S/g, function (a) {
				return a.toUpperCase();
			});
		}
	}]);

	return ListCarousel;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QtY2Fyb3VzZWwuanMiXSwibmFtZXMiOlsiTGlzdENhcm91c2VsIiwibGlzdCIsImlkIiwiYWN0aXZlIiwic3BhbiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImxpbmtzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwicGFkZGluZ0xlZnQiLCJmb3JFYWNoIiwibGluayIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwicHJldmVudERlZmF1bHQiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJjYXBpdGFsaXplIiwicmVtb3ZlIiwicyIsInJlcGxhY2UiLCJhIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFNQSxZO0FBQ0wsdUJBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFBQTs7QUFDakIsTUFBSUMsV0FBSjtBQUFBLE1BQ0NDLFNBQVMsU0FEVjtBQUFBLE1BRUNDLE9BQU9DLFNBQVNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FGUjtBQUFBLE1BR0NDLFFBQVFDLE1BQU1DLElBQU4sQ0FBV1IsS0FBS1MsZ0JBQUwsQ0FBc0IsR0FBdEIsQ0FBWCxDQUhUOztBQUtBTixPQUFLTyxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsV0FBbkI7QUFDQVIsT0FBS1MsS0FBTCxDQUFXQyxXQUFYLEdBQXlCLEtBQXpCOztBQUVBUCxRQUFNUSxPQUFOLENBQWMsZ0JBQVE7QUFDckJDLFFBQUtDLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLGFBQUs7QUFDbkNmLFNBQUtnQixFQUFFQyxNQUFGLENBQVNqQixFQUFkOztBQUVBLFFBQUdBLE1BQU1DLFdBQVdELEVBQXBCLEVBQXdCO0FBQ3ZCZ0IsT0FBRUUsY0FBRjs7QUFFQUosVUFBS0ssV0FBTCxDQUFpQmpCLElBQWpCOztBQUVBQyxjQUFTaUIsYUFBVCxVQUE4QixNQUFLQyxVQUFMLENBQWdCcEIsTUFBaEIsQ0FBOUIsRUFDRVEsU0FERixDQUNZYSxNQURaLENBQ21CLFNBRG5COztBQUdBbkIsY0FBU2lCLGFBQVQsVUFBOEIsTUFBS0MsVUFBTCxDQUFnQnJCLEVBQWhCLENBQTlCLEVBQ0VTLFNBREYsQ0FDWUMsR0FEWixDQUNnQixTQURoQjs7QUFHQVQsY0FBU0QsRUFBVDtBQUNBO0FBQ0QsSUFoQkQ7QUFpQkEsR0FsQkQ7QUFtQkE7Ozs7NkJBRVV1QixDLEVBQUc7QUFDYixVQUFPQSxFQUFFQyxPQUFGLENBQVUsYUFBVixFQUF5QixhQUFLO0FBQ3BDLFdBQU9DLEVBQUVDLFdBQUYsRUFBUDtBQUNBLElBRk0sQ0FBUDtBQUdBIiwiZmlsZSI6Imxpc3QtY2Fyb3VzZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBMaXN0Q2Fyb3VzZWwge1xuXHRjb25zdHJ1Y3RvcihsaXN0KSB7XG5cdFx0bGV0IGlkLFxuXHRcdFx0YWN0aXZlID0gJ2RlZmF1bHQnLFxuXHRcdFx0c3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSxcblx0XHRcdGxpbmtzID0gQXJyYXkuZnJvbShsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSk7XG5cdFx0XHRcblx0XHRzcGFuLmNsYXNzTGlzdC5hZGQoJ2ljb24tbGluaycpO1xuXHRcdHNwYW4uc3R5bGUucGFkZGluZ0xlZnQgPSAnM3B4Jztcblx0XHRcblx0XHRsaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdFx0XHRpZCA9IGUudGFyZ2V0LmlkO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYoaWQgJiYgYWN0aXZlICE9PSBpZCkge1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsaW5rLmFwcGVuZENoaWxkKHNwYW4pO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNkaXYke3RoaXMuY2FwaXRhbGl6ZShhY3RpdmUpfWApXG5cdFx0XHRcdFx0XHQuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZS1pbicpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNkaXYke3RoaXMuY2FwaXRhbGl6ZShpZCl9YClcblx0XHRcdFx0XHRcdC5jbGFzc0xpc3QuYWRkKCdmYWRlLWluJyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0YWN0aXZlID0gaWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cdFxuXHRjYXBpdGFsaXplKHMpIHtcblx0XHRyZXR1cm4gcy5yZXBsYWNlKC8oPzpefFxccylcXFMvZywgYSA9PiB7XG5cdFx0XHRyZXR1cm4gYS50b1VwcGVyQ2FzZSgpO1xuXHRcdH0pO1xuXHR9XG59Il19
