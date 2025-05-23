describe('Core.Interaction', function() {
  describe('auto', jasmine.fixture.specs('core.interaction'));

  describe('point mode', function() {
    beforeEach(function() {
      this.chart = window.acquireChart({
        type: 'line',
        data: {
          datasets: [{
            label: 'Dataset 1',
            data: [10, 20, 30],
            pointHoverBorderColor: 'rgb(255, 0, 0)',
            pointHoverBackgroundColor: 'rgb(0, 255, 0)'
          }, {
            label: 'Dataset 2',
            data: [40, 20, 40],
            pointHoverBorderColor: 'rgb(0, 0, 255)',
            pointHoverBackgroundColor: 'rgb(0, 255, 255)'
          }],
          labels: ['Point 1', 'Point 2', 'Point 3']
        }
      });
    });

    it ('should return all items under the point', function() {
      var chart = this.chart;
      var meta0 = chart.getDatasetMeta(0);
      var meta1 = chart.getDatasetMeta(1);
      var point = meta0.data[1];

      var evt = {
        type: 'click',
        chart: chart,
        native: true, // needed otherwise things its a DOM event
        x: point.x,
        y: point.y,
      };

      var elements = Chart.Interaction.modes.point(chart, evt, {}).map(item => item.element);
      expect(elements).toEqual([point, meta1.data[1]]);
    });

    it ('should return an empty array when no items are found', function() {
      var chart = this.chart;
      var evt = {
        type: 'click',
        chart: chart,
        native: true, // needed otherwise things its a DOM event
        x: 0,
        y: 0
      };

      var elements = Chart.Interaction.modes.point(chart, evt, {}).map(item => item.element);
      expect(elements).toEqual([]);
    });
  });

  describe('index mode', function() {
    describe('intersect: true', function() {
      beforeEach(function() {
        this.chart = window.acquireChart({
          type: 'line',
          data: {
            datasets: [{
              label: 'Dataset 1',
              data: [10, 20, 30],
              pointHoverBorderColor: 'rgb(255, 0, 0)',
              pointHoverBackgroundColor: 'rgb(0, 255, 0)'
            }, {
              label: 'Dataset 2',
              data: [40, 40, 40],
              pointHoverBorderColor: 'rgb(0, 0, 255)',
              pointHoverBackgroundColor: 'rgb(0, 255, 255)'
            }],
            labels: ['Point 1', 'Point 2', 'Point 3']
          }
        });
      });

      it ('gets correct items', function() {
        var chart = this.chart;
        var meta0 = chart.getDatasetMeta(0);
        var meta1 = chart.getDatasetMeta(1);
        var point = meta0.data[1];

        var evt = {
          type: 'click',
          chart: chart,
          native: true, // needed otherwise things its a DOM event
          x: point.x,
          y: point.y,
        };

        var elements = Chart.Interaction.modes.index(chart, evt, {intersect: true}).map(item => item.element);
        expect(elements).toEqual([point, meta1.data[1]]);
      });

      it ('returns empty array when nothing found', function() {
        var chart = this.chart;
        var evt = {
          type: 'click',
          chart: chart,
          native: true, // needed otherwise things its a DOM event
          x: 0,
          y: 0,
        };

        var elements = Chart.Interaction.modes.index(chart, evt, {intersect: true}).map(item => item.element);
        expect(elements).toEqual([]);
      });
    });

    describe ('intersect: false', function() {
      var data = {
        datasets: [{
          label: 'Dataset 1',
          data: [10, 20, 30],
          pointHoverBorderColor: 'rgb(255, 0, 0)',
          pointHoverBackgroundColor: 'rgb(0, 255, 0)'
        }, {
          label: 'Dataset 2',
          data: [40, 40, 40],
          pointHoverBorderColor: 'rgb(0, 0, 255)',
          pointHoverBackgroundColor: 'rgb(0, 255, 255)'
        }],
        labels: ['Point 1', 'Point 2', 'Point 3']
      };

      beforeEach(function() {
        this.chart = window.acquireChart({
          type: 'line',
          data: data
        });
      });

      it ('axis: x gets correct items', function() {
        var chart = this.chart;
        var meta0 = chart.getDatasetMeta(0);
        var meta1 = chart.getDatasetMeta(1);

        var evt = {
          type: 'click',
          chart: chart,
          native: true, // needed otherwise things its a DOM event
          x: chart.chartArea.left,
          y: chart.chartArea.top
        };

        var elements = Chart.Interaction.modes.index(chart, evt, {intersect: false}).map(item => item.element);
        expect(elements).toEqual([meta0.data[0], meta1.data[0]]);
      });

      it ('axis: y gets correct items', function() {
        var chart = window.acquireChart({
          type: 'bar',
          data: data,
          options: {
            indexAxis: 'y',
          }
        });

        var meta0 = chart.getDatasetMeta(0);
        var meta1 = chart.getDatasetMeta(1);
        var center = meta0.data[0].getCenterPoint();

        var evt = {
          type: 'click',
          chart: chart,
          native: true, // needed otherwise things its a DOM event
          x: center.x,
          y: center.y + 30,
        };

        var elements = Chart.Interaction.modes.index(chart, evt, {axis: 'y', intersect: false}).map(item => item.element);
        expect(elements).toEqual([meta0.data[0], meta1.data[0]]);
      });

      it ('axis: xy gets correct items', function() {
        var chart = this.chart;
        var meta0 = chart.getDatasetMeta(0);
        var meta1 = chart.getDatasetMeta(1);

        var evt = {
          type: 'click',
          chart: chart,
          native: true, // needed otherwise things its a DOM event
          x: chart.chartArea.left,
          y: chart.chartArea.top
        };

        var elements = Chart.Interaction.modes.index(chart, evt, {axis: 'xy', intersect: false}).map(item => item.element);
        expect(elements).toEqual([meta0.data[0], meta1.data[0]]);
      });
    });
  });

  describe('dataset mode', function() {
    describe('intersect: true', function() {
      beforeEach(function() {
        this.chart = window.acquireChart({
          type: 'line',
          data: {
            datasets: [{
              label: 'Dataset 1',
              data: [10, 20, 30],
              pointHoverBorderColor: 'rgb(255, 0, 0)',
              pointHoverBackgroundColor: 'rgb(0, 255, 0)'
            }, {
              label: 'Dataset 2',
              data: [40, 40, 40],
              pointHoverBorderColor: 'rgb(0, 0, 255)',
              pointHoverBackgroundColor: 'rgb(0, 255, 255)'
            }],
            labels: ['Point 1', 'Point 2', 'Point 3']
          }
        });
      });

      it ('should return all items in the dataset of the first item found', function() {
        var chart = this.chart;
        var meta = chart.getDatasetMeta(0);
        var point = meta.data[1];

        var evt = {
          type: 'click',
          chart: chart,
          native: true, // needed otherwise things its a DOM event
          x: point.x,
          y: point.y
        };

        var elements = Chart.Interaction.modes.dataset(chart, evt, {intersect: true}).map(item => item.element);
        expect(elements).toEqual(meta.data);
      });

      it ('should return an empty array if nothing found', function() {
        var chart = this.chart;
        var evt = {
          type: 'click',
          chart: chart,
          native: true, // needed otherwise things its a DOM event
          x: 0,
          y: 0
        };

        var elements = Chart.Interaction.modes.dataset(chart, evt, {intersect: true});
        expect(elements).toEqual([]);
      });
    });

    describe('intersect: false', function() {
      var data = {
        datasets: [{
          label: 'Dataset 1',
          data: [10, 20, 30],
          pointHoverBorderColor: 'rgb(255, 0, 0)',
          pointHoverBackgroundColor: 'rgb(0, 255, 0)'
        }, {
          label: 'Dataset 2',
          data: [40, 40, 40],
          pointHoverBorderColor: 'rgb(0, 0, 255)',
          pointHoverBackgroundColor: 'rgb(0, 255, 255)'
        }],
        labels: ['Point 1', 'Point 2', 'Point 3']
      };

      beforeEach(function() {
        this.chart = window.acquireChart({
          type: 'line',
          data: data
        });
      });

      it ('axis: x gets correct items', function() {
        var chart = window.acquireChart({
          type: 'bar',
          data: data,
          options: {
            indexAxis: 'y',
          }
        });

        var evt = {
          type: 'click',
          chart: chart,
          native: true, // needed otherwise things its a DOM event
          x: chart.chartArea.left,
          y: chart.chartArea.top
        };

        var elements = Chart.Interaction.modes.dataset(chart, evt, {axis: 'x', intersect: false}).map(item => item.element);
        expect(elements).toEqual(chart.getDatasetMeta(0).data);
      });

      it ('axis: y gets correct items', function() {
        var chart = this.chart;
        var evt = {
          type: 'click',
          chart: chart,
          native: true, // needed otherwise things its a DOM event
          x: chart.chartArea.left,
          y: chart.chartArea.top
        };

        var elements = Chart.Interaction.modes.dataset(chart, evt, {axis: 'y', intersect: false}).map(item => item.element);
        expect(elements).toEqual(chart.getDatasetMeta(1).data);
      });

      it ('axis: xy gets correct items', function() {
        var chart = this.chart;
        var evt = {
          type: 'click',
          chart: chart,
          native: true, // needed otherwise things its a DOM event
          x: chart.chartArea.left,
          y: chart.chartArea.top
        };

        var elements = Chart.Interaction.modes.dataset(chart, evt, {intersect: false}).map(item => item.element);
        expect(elements).toEqual(chart.getDatasetMeta(1).data);
      });
    });
  });

  describe('nearest mode', function() {
    describe('intersect: false', function() {
      beforeEach(function() {
        this.lineChart = window.acquireChart({
          type: 'line',
          data: {
            datasets: [{
              label: 'Dataset 1',
              data: [10, 40, 30],
              pointRadius: [5, 5, 5],
              pointHoverBorderColor: 'rgb(255, 0, 0)',
              pointHoverBackgroundColor: 'rgb(0, 255, 0)'
            }, {
              label: 'Dataset 2',
              data: [40, 40, 40],
              pointRadius: [10, 10, 10],
              pointHoverBorderColor: 'rgb(0, 0, 255)',
              pointHoverBackgroundColor: 'rgb(0, 255, 255)'
            }],
            labels: ['Point 1', 'Point 2', 'Point 3']
          }
        });
        this.polarChart = window.acquireChart({
          type: 'polarArea',
          data: {
            datasets: [{
              data: [1, 9, 5]
            }],
            labels: ['Point 1', 'Point 2', 'Point 3']
          },
          options: {
            plugins: {
              legend: {
                display: false
              },
            },
          }
        });
      });

      describe('axis: xy', function() {
        it ('should return the nearest item', function() {
          var chart = this.lineChart;
          var evt = {
            type: 'click',
            chart: chart,
            native: true, // needed otherwise things its a DOM event
            x: chart.chartArea.left,
            y: chart.chartArea.top
          };

          // Nearest to 0,0 (top left) will be first point of dataset 2
          var elements = Chart.Interaction.modes.nearest(chart, evt, {intersect: false}).map(item => item.element);
          var meta = chart.getDatasetMeta(1);
          expect(elements).toEqual([meta.data[0]]);
        });

        it ('should return all items at the same nearest distance', function() {
          var chart = this.lineChart;
          var meta0 = chart.getDatasetMeta(0);
          var meta1 = chart.getDatasetMeta(1);

          // Halfway between 2 mid points
          var pt = {
            x: meta0.data[1].x,
            y: (meta0.data[1].y + meta1.data[1].y) / 2
          };

          var evt = {
            type: 'click',
            chart: chart,
            native: true, // needed otherwise things its a DOM event
            x: pt.x,
            y: pt.y
          };

          // Both points are nearest
          var elements = Chart.Interaction.modes.nearest(chart, evt, {intersect: false}).map(item => item.element);
          expect(elements).toEqual([meta0.data[1], meta1.data[1]]);
        });
      });

      describe('axis: x', function() {
        it ('should return all items at current x', function() {
          var chart = this.lineChart;
          var meta0 = chart.getDatasetMeta(0);
          var meta1 = chart.getDatasetMeta(1);

          // At 'Point 2', 10
          var pt = {
            x: meta0.data[1].x,
            y: meta0.data[0].y
          };

          var evt = {
            type: 'click',
            chart: chart,
            native: true, // needed otherwise things its a DOM event
            x: pt.x,
            y: pt.y
          };

          // Middle point from both series are nearest
          var elements = Chart.Interaction.modes.nearest(chart, evt, {axis: 'x', intersect: false}).map(item => item.element);
          expect(elements).toEqual([meta0.data[1], meta1.data[1]]);
        });

        it ('should return all items at nearest x-distance', function() {
          var chart = this.lineChart;
          var meta0 = chart.getDatasetMeta(0);
          var meta1 = chart.getDatasetMeta(1);

          // Haflway between 'Point 1' and 'Point 2', y=10
          var pt = {
            x: (meta0.data[0].x + meta0.data[1].x) / 2,
            y: meta0.data[0].y
          };

          var evt = {
            type: 'click',
            chart: chart,
            native: true, // needed otherwise things its a DOM event
            x: pt.x,
            y: pt.y
          };

          // Should return all (4) points from 'Point 1' and 'Point 2'
          var elements = Chart.Interaction.modes.nearest(chart, evt, {axis: 'x', intersect: false}).map(item => item.element);
          expect(elements).toEqual([meta0.data[0], meta0.data[1], meta1.data[0], meta1.data[1]]);
        });
      });

      describe('axis: y', function() {
        it ('should return item with value 30', function() {
          var chart = this.lineChart;
          var meta0 = chart.getDatasetMeta(0);

          // 'Point 1', y = 30
          var pt = {
            x: meta0.data[0].x,
            y: meta0.data[2].y
          };

          var evt = {
            type: 'click',
            chart: chart,
            native: true, // needed otherwise things its a DOM event
            x: pt.x,
            y: pt.y
          };

          // Middle point from both series are nearest
          var elements = Chart.Interaction.modes.nearest(chart, evt, {axis: 'y', intersect: false}).map(item => item.element);
          expect(elements).toEqual([meta0.data[2]]);
        });

        it ('should return all items at value 40', function() {
          var chart = this.lineChart;
          var meta0 = chart.getDatasetMeta(0);
          var meta1 = chart.getDatasetMeta(1);

          // 'Point 1', y = 40
          var pt = {
            x: meta0.data[0].x,
            y: meta0.data[1].y
          };

          var evt = {
            type: 'click',
            chart: chart,
            native: true, // needed otherwise things its a DOM event
            x: pt.x,
            y: pt.y
          };

          // Should return points with value 40
          var elements = Chart.Interaction.modes.nearest(chart, evt, {axis: 'y', intersect: false}).map(item => item.element);
          expect(elements).toEqual([meta0.data[1], meta1.data[0], meta1.data[1], meta1.data[2]]);
        });
      });

      describe('axis: r', function() {
        it ('should return item with value 9', function() {
          var chart = this.polarChart;
          var meta0 = chart.getDatasetMeta(0);

          var evt = {
            type: 'click',
            chart: chart,
            native: true, // Needed, otherwise assumed to be a DOM event
            x: chart.width / 2,
            y: chart.height / 2 + 5,
          };

          var elements = Chart.Interaction.modes.nearest(chart, evt, {axis: 'r'}).map(item => item.element);
          expect(elements).toEqual([meta0.data[1]]);
        });

        it ('should return item with value 1 when clicked outside of it', function() {
          var chart = this.polarChart;
          var meta0 = chart.getDatasetMeta(0);

          var evt = {
            type: 'click',
            chart: chart,
            native: true, // Needed, otherwise assumed to be a DOM event
            x: chart.width,
            y: 0,
          };

          var elements = Chart.Interaction.modes.nearest(chart, evt, {axis: 'r', intersect: false}).map(item => item.element);
          expect(elements).toEqual([meta0.data[0]]);
        });
      });
    });

    describe('intersect: true', function() {
      beforeEach(function() {
        this.chart = window.acquireChart({
          type: 'line',
          data: {
            datasets: [{
              label: 'Dataset 1',
              data: [10, 20, 30],
              pointHoverBorderColor: 'rgb(255, 0, 0)',
              pointHoverBackgroundColor: 'rgb(0, 255, 0)'
            }, {
              label: 'Dataset 2',
              data: [40, 40, 40],
              pointHoverBorderColor: 'rgb(0, 0, 255)',
              pointHoverBackgroundColor: 'rgb(0, 255, 255)'
            }],
            labels: ['Point 1', 'Point 2', 'Point 3']
          }
        });
      });

      describe('axis=xy', function() {
        it ('should return the nearest item', function() {
          var chart = this.chart;
          var meta = chart.getDatasetMeta(1);
          var point = meta.data[1];

          var evt = {
            type: 'click',
            chart: chart,
            native: true, // needed otherwise things its a DOM event
            x: point.x + 15,
            y: point.y
          };

          // Nothing intersects so find nothing
          var elements = Chart.Interaction.modes.nearest(chart, evt, {intersect: true}).map(item => item.element);
          expect(elements).toEqual([]);

          evt = {
            type: 'click',
            chart: chart,
            native: true,
            x: point.x,
            y: point.y
          };
          elements = Chart.Interaction.modes.nearest(chart, evt, {intersect: true}).map(item => item.element);
          expect(elements).toEqual([point]);
        });

        it ('should return the nearest item even if 2 intersect', function() {
          var chart = this.chart;
          chart.data.datasets[0].pointRadius = [5, 30, 5];
          chart.data.datasets[0].data[1] = 39;

          chart.data.datasets[1].pointRadius = [10, 10, 10];

          chart.update();

          // Trigger an event over top of the
          var meta0 = chart.getDatasetMeta(0);

          // Halfway between 2 mid points
          var pt = {
            x: meta0.data[1].x,
            y: meta0.data[1].y
          };

          var evt = {
            type: 'click',
            chart: chart,
            native: true, // needed otherwise things its a DOM event
            x: pt.x,
            y: pt.y
          };

          var elements = Chart.Interaction.modes.nearest(chart, evt, {intersect: true}).map(item => item.element);
          expect(elements).toEqual([meta0.data[1]]);
        });

        it ('should return the all items if more than 1 are at the same distance', function() {
          var chart = this.chart;
          chart.data.datasets[0].pointRadius = [5, 5, 5];
          chart.data.datasets[0].data[1] = 40;

          chart.data.datasets[1].pointRadius = [10, 10, 10];

          chart.update();

          var meta0 = chart.getDatasetMeta(0);
          var meta1 = chart.getDatasetMeta(1);

          // Halfway between 2 mid points
          var pt = {
            x: meta0.data[1].x,
            y: meta0.data[1].y
          };

          var evt = {
            type: 'click',
            chart: chart,
            native: true, // needed otherwise things its a DOM event
            x: pt.x,
            y: pt.y
          };

          var elements = Chart.Interaction.modes.nearest(chart, evt, {intersect: true}).map(item => item.element);
          expect(elements).toEqual([meta0.data[1], meta1.data[1]]);
        });
      });
    });
  });

  describe('x mode', function() {
    beforeEach(function() {
      this.chart = window.acquireChart({
        type: 'line',
        data: {
          datasets: [{
            label: 'Dataset 1',
            data: [10, 40, 30],
            pointRadius: [5, 10, 5],
            pointHoverBorderColor: 'rgb(255, 0, 0)',
            pointHoverBackgroundColor: 'rgb(0, 255, 0)'
          }, {
            label: 'Dataset 2',
            data: [40, 40, 40],
            pointRadius: [10, 10, 10],
            pointHoverBorderColor: 'rgb(0, 0, 255)',
            pointHoverBackgroundColor: 'rgb(0, 255, 255)'
          }],
          labels: ['Point 1', 'Point 2', 'Point 3']
        }
      });
    });

    it('should return items at the same x value when intersect is false', function() {
      var chart = this.chart;
      var meta0 = chart.getDatasetMeta(0);
      var meta1 = chart.getDatasetMeta(1);

      // Halfway between 2 mid points
      var pt = {
        x: meta0.data[1].x,
        y: meta0.data[1].y
      };

      var evt = {
        type: 'click',
        chart: chart,
        native: true, // needed otherwise things its a DOM event
        x: pt.x,
        y: 0
      };

      var elements = Chart.Interaction.modes.x(chart, evt, {intersect: false}).map(item => item.element);
      expect(elements).toEqual([meta0.data[1], meta1.data[1]]);

      evt = {
        type: 'click',
        chart: chart,
        native: true, // needed otherwise things its a DOM event
        x: pt.x + 20,
        y: 0
      };

      elements = Chart.Interaction.modes.x(chart, evt, {intersect: false}).map(item => item.element);
      expect(elements).toEqual([]);
    });

    it('should return items at the same x value when intersect is true', function() {
      var chart = this.chart;
      var meta0 = chart.getDatasetMeta(0);
      var meta1 = chart.getDatasetMeta(1);

      // Halfway between 2 mid points
      var pt = {
        x: meta0.data[1].x,
        y: meta0.data[1].y
      };

      var evt = {
        type: 'click',
        chart: chart,
        native: true, // needed otherwise things its a DOM event
        x: pt.x,
        y: 0
      };

      var elements = Chart.Interaction.modes.x(chart, evt, {intersect: true}).map(item => item.element);
      expect(elements).toEqual([]); // we don't intersect anything

      evt = {
        type: 'click',
        chart: chart,
        native: true, // needed otherwise things its a DOM event
        x: pt.x,
        y: pt.y
      };

      elements = Chart.Interaction.modes.x(chart, evt, {intersect: true}).map(item => item.element);
      expect(elements).toEqual([meta0.data[1], meta1.data[1]]);
    });
  });

  describe('y mode', function() {
    beforeEach(function() {
      this.chart = window.acquireChart({
        type: 'line',
        data: {
          datasets: [{
            label: 'Dataset 1',
            data: [10, 40, 30],
            pointRadius: [5, 10, 5],
            pointHoverBorderColor: 'rgb(255, 0, 0)',
            pointHoverBackgroundColor: 'rgb(0, 255, 0)'
          }, {
            label: 'Dataset 2',
            data: [40, 40, 40],
            pointRadius: [10, 10, 10],
            pointHoverBorderColor: 'rgb(0, 0, 255)',
            pointHoverBackgroundColor: 'rgb(0, 255, 255)'
          }],
          labels: ['Point 1', 'Point 2', 'Point 3']
        }
      });
    });

    it('should return items at the same y value when intersect is false', function() {
      var chart = this.chart;
      var meta0 = chart.getDatasetMeta(0);
      var meta1 = chart.getDatasetMeta(1);

      // Halfway between 2 mid points
      var pt = {
        x: meta0.data[1].x,
        y: meta0.data[1].y
      };

      var evt = {
        type: 'click',
        chart: chart,
        native: true,
        x: 0,
        y: pt.y,
      };

      var elements = Chart.Interaction.modes.y(chart, evt, {intersect: false}).map(item => item.element);
      expect(elements).toEqual([meta0.data[1], meta1.data[0], meta1.data[1], meta1.data[2]]);

      evt = {
        type: 'click',
        chart: chart,
        native: true,
        x: pt.x,
        y: pt.y + 20, // out of range
      };

      elements = Chart.Interaction.modes.y(chart, evt, {intersect: false}).map(item => item.element);
      expect(elements).toEqual([]);
    });

    it('should return items at the same y value when intersect is true', function() {
      var chart = this.chart;
      var meta0 = chart.getDatasetMeta(0);
      var meta1 = chart.getDatasetMeta(1);

      // Halfway between 2 mid points
      var pt = {
        x: meta0.data[1].x,
        y: meta0.data[1].y
      };

      var evt = {
        type: 'click',
        chart: chart,
        native: true,
        x: 0,
        y: pt.y
      };

      var elements = Chart.Interaction.modes.y(chart, evt, {intersect: true}).map(item => item.element);
      expect(elements).toEqual([]); // we don't intersect anything

      evt = {
        type: 'click',
        chart: chart,
        native: true,
        x: pt.x,
        y: pt.y,
      };

      elements = Chart.Interaction.modes.y(chart, evt, {intersect: true}).map(item => item.element);
      expect(elements).toEqual([meta0.data[1], meta1.data[0], meta1.data[1], meta1.data[2]]);
    });
  });

  describe('tooltip element of scatter chart', function() {
    it ('out-of-range datapoints are not shown in tooltip', function() {
      let data = [];
      for (let i = 0; i < 1000; i++) {
        data.push({x: i, y: i});
      }

      const chart = window.acquireChart({
        type: 'scatter',
        data: {
          datasets: [{data}]
        },
        options: {
          scales: {
            x: {
              min: 2
            }
          }
        }
      });

      const meta0 = chart.getDatasetMeta(0);
      const firstElement = meta0.data[0];

      const evt = {
        type: 'click',
        chart: chart,
        native: true, // needed otherwise things its a DOM event
        x: firstElement.x,
        y: firstElement.y
      };

      const elements = Chart.Interaction.modes.point(chart, evt, {intersect: true}).map(item => item.element);
      expect(elements).not.toContain(firstElement);
    });

    it ('out-of-range datapoints are shown in tooltip if included', function() {
      let data = [];
      for (let i = 0; i < 1000; i++) {
        data.push({x: i, y: i});
      }

      const chart = window.acquireChart({
        type: 'scatter',
        data: {
          datasets: [{data}]
        },
        options: {
          scales: {
            x: {
              min: 2
            }
          }
        }
      });

      const meta0 = chart.getDatasetMeta(0);
      const firstElement = meta0.data[0];

      const evt = {
        type: 'click',
        chart: chart,
        native: true, // needed otherwise it thinks its a DOM event
        x: firstElement.x,
        y: firstElement.y
      };

      const elements = Chart.Interaction.modes.point(
        chart,
        evt,
        {
          intersect: true,
          includeInvisible: true
        }).map(item => item.element);
      expect(elements).toContain(firstElement);
    });
  });

  const testCases = [
    {
      data: [12, 19, null, null, null, null, 5, 2],
      clickPointIndex: 0,
      expectedNearestPointIndex: 0
    },
    {
      data: [12, 19, null, null, null, null, 5, 2],
      clickPointIndex: 1,
      expectedNearestPointIndex: 1},
    {
      data: [12, 19, null, null, null, null, 5, 2],
      clickPointIndex: 2,
      expectedNearestPointIndex: 1
    },
    {
      data: [12, 19, null, null, null, null, 5, 2],
      clickPointIndex: 3,
      expectedNearestPointIndex: 1
    },
    {
      data: [12, 19, null, null, null, null, 5, 2],
      clickPointIndex: 4,
      expectedNearestPointIndex: 6
    },
    {
      data: [12, 19, null, null, null, null, 5, 2],
      clickPointIndex: 5,
      expectedNearestPointIndex: 6
    },
    {
      data: [12, 19, null, null, null, null, 5, 2],
      clickPointIndex: 6,
      expectedNearestPointIndex: 6
    },
    {
      data: [12, 19, null, null, null, null, 5, 2],
      clickPointIndex: 7,
      expectedNearestPointIndex: 7
    },
    {
      data: [12, 0, null, null, null, null, 0, 2],
      clickPointIndex: 3,
      expectedNearestPointIndex: 1
    },
    {
      data: [12, 0, null, null, null, null, 0, 2],
      clickPointIndex: 4,
      expectedNearestPointIndex: 6
    },
    {
      data: [12, -1, null, null, null, null, -1, 2],
      clickPointIndex: 3,
      expectedNearestPointIndex: 1
    },
    {
      data: [12, -1, null, null, null, null, -1, 2],
      clickPointIndex: 4,
      expectedNearestPointIndex: 6
    },
    {
      data: [null, 2],
      clickPointIndex: 0,
      expectedNearestPointIndex: 1
    },
    {
      data: [2, null],
      clickPointIndex: 1,
      expectedNearestPointIndex: 0
    },
    {
      data: [null, null, 2],
      clickPointIndex: 0,
      expectedNearestPointIndex: 2
    },
    {
      data: [2, null, null],
      clickPointIndex: 2,
      expectedNearestPointIndex: 0
    }
  ];
  testCases.forEach(({data, clickPointIndex, expectedNearestPointIndex}, i) => {
    it(`should select nearest non-null element with index ${expectedNearestPointIndex} when clicking on element with index ${clickPointIndex} in test case ${i + 1} if spanGaps=true`, function() {
      const chart = window.acquireChart({
        type: 'line',
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          datasets: [{
            data: data,
            spanGaps: true,
          }]
        }
      });
      chart.update();
      const meta = chart.getDatasetMeta(0);
      const point = meta.data[clickPointIndex];

      const evt = {
        type: 'click',
        chart: chart,
        native: true, // needed otherwise things its a DOM event
        x: point.x,
        y: point.y,
      };

      const elements = Chart.Interaction.modes.nearest(chart, evt, {axis: 'x', intersect: false}).map(item => item.element);
      expect(elements).toEqual([meta.data[expectedNearestPointIndex]]);
    });
  });
});
