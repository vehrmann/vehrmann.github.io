from osgeo import gdal, ogr
import os

# Define the input HGT file and output shapefile
input_hgt_file = 'C:/Users/vehrm/Documents/Projekte/Programmierung/Github/vehrmann.github.io/bw-karte/python/N47E011.hgt'
output_shapefile = 'C:/Users/vehrm/Documents/Projekte/Programmierung/Github/vehrmann.github.io/bw-karte/python/output_contours.shp'

# Open the DEM file using GDAL
ds = gdal.Open(input_hgt_file)

# Create a contour layer
contour_ds = ogr.GetDriverByName('ESRI Shapefile').CreateDataSource(output_shapefile)
contour_layer = contour_ds.CreateLayer('contours', geom_type=ogr.wkbLineString)

# Define contour intervals (100m steps in this case)
contour_interval = 100

# Generate contours
gdal.ContourGenerate(ds.GetRasterBand(1), contour_interval, 0, [], 0, 0, contour_layer, 0, 1)

# Close the shapefile and DEM datasets
contour_ds = None
ds = None

print(f"Contour lines generated and saved to {output_shapefile}")