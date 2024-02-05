
from osgeo import gdal, ogr
import os

def generate_contours(input_hgt_file, output_geojson, contour_interval):
    # Open the DEM file using GDAL
    ds = gdal.Open(input_hgt_file)

    # Create a contour layer
    contour_ds = ogr.GetDriverByName('GeoJSON').CreateDataSource(output_geojson)
    contour_layer = contour_ds.CreateLayer('contours', geom_type=ogr.wkbLineString)

    # Define contour intervals
    gdal.ContourGenerate(ds.GetRasterBand(1), contour_interval, 0, [], 0, 0, contour_layer, 0, 1)

    # Close the GeoJSON and DEM datasets
    contour_ds = None
    ds = None

if __name__ == "__main__":
    # Define input HGT file, output GeoJSON file, and contour interval
    input_hgt_file = 'C:/Users/vehrm/Documents/Projekte/Programmierung/Github/vehrmann.github.io/bw-karte/python/N47E011.hgt'
    output_geojson = 'C:/Users/vehrm/Documents/Projekte/Programmierung/Github/vehrmann.github.io/bw-karte/python/N47E011_contours_100_steps.geojson'
    contour_interval = 100

    # Generate contours and save to GeoJSON
    generate_contours(input_hgt_file, output_geojson, contour_interval)

    print(f"Contour lines generated and saved to {output_geojson}")
