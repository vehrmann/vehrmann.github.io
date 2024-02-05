from osgeo import gdal, ogr
from shapely.geometry import shape, mapping
#from shapely.geometry.simplify import simplify
import json  # Added to load GeoJSON data
import os

def generate_contours(input_hgt_file, output_geojson, contour_interval, target_elevation, simplify_tolerance):
    # Open the DEM file using GDAL
    ds = gdal.Open(input_hgt_file)

    # Create a contour layer
    contour_ds = ogr.GetDriverByName('GeoJSON').CreateDataSource(output_geojson)
    contour_layer = contour_ds.CreateLayer('contours', geom_type=ogr.wkbLineString)
    
    # Define contour intervals
    gdal.ContourGenerate(ds.GetRasterBand(1), contour_interval, 0, [target_elevation], 0, 0, contour_layer, 0, 1)

    # Close the GeoJSON and DEM datasets
    contour_ds = None
    ds = None

    # Simplify contours using Douglas-Peucker algorithm
    simplify_and_write(output_geojson, output_geojson, simplify_tolerance)

def simplify_and_write(input_geojson, output_geojson, tolerance):
    with open(input_geojson, 'r') as f:
        geojson_data = json.load(f)  # Load GeoJSON data as a dictionary

    simplified_features = []
    
    for feature in geojson_data['features']:
        geometry = shape(feature['geometry'])
        simplified_geometry = geometry.simplify(tolerance, preserve_topology=True)
        simplified_features.append({'type': 'Feature', 'geometry': mapping(simplified_geometry), 'properties': feature['properties']})

    simplified_feature_collection = {'type': 'FeatureCollection', 'features': simplified_features}

    with open(output_geojson, 'w') as f:
        json.dump(simplified_feature_collection, f)  # Use json.dump to write the simplified GeoJSON

if __name__ == "__main__":
    # Define input HGT file, output GeoJSON file, contour interval, target elevation, and simplify tolerance
    input_hgt_file = 'C:/Users/vehrm/Documents/Projekte/Programmierung/Github/vehrmann.github.io/bw-karte/python/N47E011.hgt'
    output_geojson = 'C:/Users/vehrm/Documents/Projekte/Programmierung/Github/vehrmann.github.io/bw-karte/python/N47E011_contours_1200.geojson'
    contour_interval = 100  # Adjust the interval as needed
    target_elevation = 1200
    #simplify_tolerance = 0.00025  # Adjust as needed
    simplify_tolerance = 0.00005

    # Generate contours for the target elevation, simplify, and save to GeoJSON
    generate_contours(input_hgt_file, output_geojson, contour_interval, target_elevation, simplify_tolerance)

    print(f"Contour lines for {target_elevation}m generated, simplified, and saved to {output_geojson}")
