# Docker Instructions

To build the image execute
```docker image build -t stock-sage-ui:latest .```

To run the container execute
```docker run -dp 3000:3000 --name stock-sage-frontend --rm stock-sage-ui:latest```