jQuery("#world-map").length &&
  am4core.ready(function () {
    am4core.ready(function () {
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create map instance
      var chart = am4core.create("world-map", am4maps.MapChart);

      // Set map definition
      chart.geodata = am4geodata_worldLow;

      chart.logo.disabled = true;

      // Set projection
      chart.projection = new am4maps.projections.Miller();

      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

      // Exclude Antartica
      polygonSeries.exclude = ["AQ"];

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;

      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);

      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create("hover");
      hs.properties.fill = chart.colors.getIndex(0);

      // Add image series
      var imageSeries = chart.series.push(new am4maps.MapImageSeries());
      imageSeries.mapImages.template.propertyFields.longitude = "longitude";
      imageSeries.mapImages.template.propertyFields.latitude = "latitude";
      imageSeries.data = [
        {
          title: "Brussels",
          latitude: 50.8371,
          longitude: 4.3676,
        },
        {
          title: "Copenhagen",
          latitude: 55.6763,
          longitude: 12.5681,
        },
        {
          title: "Paris",
          latitude: 48.8567,
          longitude: 2.351,
        },
        {
          title: "Reykjavik",
          latitude: 64.1353,
          longitude: -21.8952,
        },
        {
          title: "Moscow",
          latitude: 55.7558,
          longitude: 37.6176,
        },
        {
          title: "Madrid",
          latitude: 40.4167,
          longitude: -3.7033,
        },
        {
          title: "London",
          latitude: 51.5002,
          longitude: -0.1262,
          url: "http://www.google.co.uk",
        },
        {
          title: "Peking",
          latitude: 39.9056,
          longitude: 116.3958,
        },
        {
          title: "New Delhi -2",
          latitude: 28.6353,
          longitude: 77.225,
        },
        {
          title: "Tokyo",
          latitude: 35.6785,
          longitude: 139.6823,
          url: "http://www.google.co.jp",
        },
        {
          title: "Ankara",
          latitude: 39.9439,
          longitude: 32.856,
        },
        {
          title: "Buenos Aires",
          latitude: -34.6118,
          longitude: -58.4173,
        },
        {
          title: "Brasilia",
          latitude: -15.7801,
          longitude: -47.9292,
        },
        {
          title: "Ottawa",
          latitude: 45.4235,
          longitude: -75.6979,
        },
        {
          title: "Washington",
          latitude: 38.8921,
          longitude: -77.0241,
        },
        {
          title: "Kinshasa",
          latitude: -4.3369,
          longitude: 15.3271,
        },
        {
          title: "Cairo",
          latitude: 30.0571,
          longitude: 31.2272,
        },
        {
          title: "Pretoria",
          latitude: -25.7463,
          longitude: 28.1876,
        },
      ];

      // add events to recalculate map position when the map is moved or zoomed
      chart.events.on("ready", updateCustomMarkers);
      chart.events.on("mappositionchanged", updateCustomMarkers);

      // this function will take current images on the map and create HTML elements for them
      function updateCustomMarkers(event) {
        // go through all of the images
        imageSeries.mapImages.each(function (image) {
          // check if it has corresponding HTML element
          if (!image.dummyData || !image.dummyData.externalElement) {
            // create onex
            image.dummyData = {
              externalElement: createCustomMarker(image),
            };
          }

          // reposition the element accoridng to coordinates
          var xy = chart.geoPointToSVG({
            longitude: image.longitude,
            latitude: image.latitude,
          });
          image.dummyData.externalElement.style.top = xy.y + "px";
          image.dummyData.externalElement.style.left = xy.x + "px";
        });
      }

      // this function creates and returns a new marker element
      function createCustomMarker(image) {
        var chart = image.dataItem.component.chart;

        // create holder
        var holder = document.createElement("div");
        holder.className = "map-marker";
        holder.title = image.dataItem.dataContext.title;
        holder.style.position = "absolute";

        // maybe add a link to it?
        if (undefined != image.url) {
          holder.onclick = function () {
            window.location.href = image.url;
          };
          holder.className += " map-clickable";
        }

        // create dot
        var dot = document.createElement("div");
        dot.className = "dot";
        holder.appendChild(dot);

        // create pulse
        var pulse = document.createElement("div");
        pulse.className = "pulse";
        holder.appendChild(pulse);

        // append the marker to the map container
        chart.svgContainer.htmlElement.appendChild(holder);

        return holder;
      }
    });
  });
